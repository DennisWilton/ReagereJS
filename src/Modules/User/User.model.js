const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
  });

  
userSchema.methods.checkPassword = function(password){
    return this.password === password;
}

const User = mongoose.model('User', userSchema);


module.exports = User;