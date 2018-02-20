const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var { mongoose} = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

// NOTE: Express Object
var app = express();

// NOTE: Receive JSON
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({ text: req.body.text });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id ).then((todo) => {
    if (!todo) {
      res.status(404).send('empty body');
    }
    res.json(todo);
  }, (err) => {
    res.status(400).send('empty body back');
  });
});

// NOTE: Start Server in port 3000
app.listen(3000, () => {
  console.log('Start on port 3000');
});

module.exports = { app };
