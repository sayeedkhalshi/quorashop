const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  //check if email already exist
  const oldUser = await User.findOne({ email: req.body.email });

  if (oldUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const EmailVerifyToken = await createToken(newUser._id);

  res.status(200).json({
    EmailVerifyToken,
  });
});
