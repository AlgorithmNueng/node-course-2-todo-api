var mongoose = require('mongoose');

// NOTE: Schema
var UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

// NOTE: Model
var User = mongoose.model('User', UserSchema);

module.exports = { User };
