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

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
      .then(user => {
          if(user) {
              res.status(200).json(user)
          }
          res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ errorMessage: "The user information could not be retrieved."})
      });
});

// POST Request
server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
        if(!name && !bio){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            db.insert({ name, bio })
                .then(user => {
                    res.status(201).json(user);
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ errorMessage: "There was an error while saving the user to the database." })
                })
        }
});

// DELETE Request
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
      .then(removed => {
        if(removed) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
});

// PUT Request 
server.put('/api/users/:id', (req, res) => {
    // const id = req.params.id;
    const { name, bio } = req.body;
        if(!name || !bio){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            db.update(req.params.id, req.body)
              .then(user => {
                if (user) {
                    res.status(200).json(req.body)
                } else {
                    res.status(404).json({ message: "The user with the specified ID does not exist." })
                }
        })
            .catch(err => {
                // console.log('Error on Put Request', err)
                res.status(500).json({ errorMessage: "The user information could not be modified." })
        })  
    }   
});


const port = 5000;
server.listen(port, () => console.log(`\n API running on port ${port} \n`))