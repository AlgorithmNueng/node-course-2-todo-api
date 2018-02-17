var mongoose = require('mongoose');

// NOTE: Schema
var Todo = mongoose.Schema({
  text: { type: String, required: true, minlength: 1, trim: true },
  completed: { type: Boolean, default: false},
  completedAt: { type: Number, default: null}
});

// NOTE: Model
var Todo = mongoose.model('Todo', Todo);

module.exports = { Todo };
