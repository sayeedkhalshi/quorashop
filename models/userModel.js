const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
    minlength: [12, 'password must be minimum 12 characters long'],
    maxlength: [100, 'password must be maximum 100 characters long'],
    required: [true, 'Password is required'],
    select: false,
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
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

// userSchema.pre('save', async (next) => {
//   if (!isModified('password') || this.isNew) return next();
// })

module.exports = User = mongoose.model('User', userSchema);
