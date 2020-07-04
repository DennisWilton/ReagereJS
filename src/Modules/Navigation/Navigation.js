const { checkRoute } = require("./routes");
const checkToken = require("../Auth/checkToken");



function Navigation(){
    this.navigation = {}
    const {client, io, navigation} = this;

    navigation.at = 'home';
    
    navigation.go = (_page, token) => {
        console.log(`${this.id} wants to go to ${_page}.`)

        const {isValid, isPrivate} = checkRoute(_page);

        if(!isValid){
            navigation.go("landing", token);
            return;
        }

        if(isValid && isPrivate){
            const {status, ...rest} = checkToken(token);
            if(!status){
                navigation.go("landing", token);
                return;
            }
        }
        
        client.emit('NAVIGATION.UPDATE', _page);
        
        return;
    }

    client.on('NAVIGATION.GO', data => {
        const { path, token } = data;
        navigation.go(path, token);
    })
}


module.exports = Navigation;