const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//     firstname: String,
//     lastname:  String,
//     email: String,
//     username: String,
//     password: String,
//   });

  const userSchema = new mongoose.Schema({
    firstname: String,
    lastname:  String,
    email: String,
    username: String,
    password: String,
    role: {
      type: String,
      enum: ['admin', 'subscriber'],
      default: 'subscriber'  // You can set a default role if needed
    },
  });

  userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
  
  userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
  };
  const UserRegistration = new mongoose.model("user_Registration", userSchema);
  module.exports = UserRegistration;
