const Module = require('../Module');
const { checkRoute } = require("./routes");
const checkToken = require("../Auth/checkToken");


function Navigation(props){
    Module.call(this, "Navigation");
    Object.assign(this, props.previousData, {instance: props.instance});
}

Object.assign(Navigation.prototype, Module.prototype);

Navigation.prototype.init = function(){
}

module.exports = Navigation;