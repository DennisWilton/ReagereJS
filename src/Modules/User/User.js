const Module = require('../Module');
const USER = require('./User.model');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config.json');
const checkToken = require('../Auth/checkToken');

function User(props){
    Module.call(this, "User");
    Object.assign(this, props.previousData, {instance: props.instance});
}

Object.assign(User.prototype, Module.prototype);

User.prototype.init = function(){
    if(!this.isGuest){
        console.log("Is not guest");
    } else {
        console.log("Is guest");
    }
}

User.prototype.say = function(message){
    console.log(`${this.username || "Visitante" } says: ${message}`)
}


module.exports = User;