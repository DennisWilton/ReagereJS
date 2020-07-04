const uuid = require('uuid');

function User(){
    this.user = {}
    const {client, io, user} = this;
    
    client.on('USER.LOGIN', (data = {}) => {
        
        const {credentials} = data;

        client.emit('USER.DATA', {...this.user});
    });

    client.on('USER.LOGOUT', (data) => {
        user.isLogged = false;
        this.navigation.go('landing');
    });

    client.on('USER.CHANGEPASSWORD', (data) => {
        this.navigation.go('changePassword');
    });
}


module.exports = User;