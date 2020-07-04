const Navigation = require("./Modules/Navigation/Navigation");
const User = require("./Modules/User/User");
const Dashboard = require("./Modules/Dashboard/Dashboard");

function Instance(io, client){
    this.io = io;
    this.client = client;
    this.id = this.client.id;

    //Modulos
    User.call(this);
    Navigation.call(this);
    Dashboard.call(this);
}



module.exports = Instance;