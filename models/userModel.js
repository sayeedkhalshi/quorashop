const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [32, 'Name must be maximum 32 characters long'],
    minlength: [2, 'Name must be at least 2 characters long'],
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    validate: [validator.isEmail, 'Email is not valid'],
  },
  password: {
    type: String,
    minlength: 12,
    maxlength: 100,
    required: [true, 'Password is required'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirm field is required'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password should be same',
    },
  },
});

module.exports = User = mongoose.model('User', userSchema);
