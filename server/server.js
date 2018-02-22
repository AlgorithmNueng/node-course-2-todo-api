const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var { mongoose} = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

// NOTE: Deploy
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.json(todo);
  },(err) => {
    return res.status(400).send();
  });
});

// NOTE: Patch or Update
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  console.log(JSON.stringify(body, undefined, 2));

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime(); //return javascript timestamp
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body}, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send();
  });
});


// NOTE: Start Server in port 3000
app.listen(port, () => {
  console.log(`Start on port ${port}`);
});

module.exports = { app };
