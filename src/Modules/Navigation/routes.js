const routes = require('./routes.json');

exports.checkRoute = route => {
    const isValid = Boolean(routes[route]); 
    const isPrivate = Boolean(routes[route].isPrivate);
    
    return {isValid, isPrivate};
}