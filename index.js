// implement your API here
const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

// GET Requests
server.get('/', (req, res) => {
    res.send({ api: "API Working" })
})

server.get('/api/users', (req, res) => {
    db.find()
      .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    });
});