const factory = require('./handlers/factory');
const User = require('./../models/userModel');

exports.getAllUsers = factory.getAll(User);
