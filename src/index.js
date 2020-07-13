const Navigation = require("./Modules/Navigation/Navigation");
const User = require("./Modules/User/User");
const Dashboard = require("./Modules/Dashboard/Dashboard");
const { isArray } = require("lodash");

let reqs = 0;

function Instance(io, client){
    this.io = io;
    this.client = client;
    this.socket = client;
    this.id = this.client.id;
   
    this.userInc().show();

    this.install(User, Navigation);

    this.initModules();

    client.on("disconnect", () => {
        this.userDec().show();
    })
}

Instance.prototype.userInc = function(number = 1){
    if(!this.io.users) this.io.users = 0;
    this.io.users += number;

    const users = this.io.users;

    return { show: function(){
        console.log(`> Usuário conectado. Agora há ${String(users).padStart(2, "0")} usuário${users !== 1 ? 's' : '' } online no sistema.`)
    }}
}

Instance.prototype.userDec = function(number = 1){
    if(!this.io.users) this.io.users = 0;
    this.io.users -= number;

    const users = this.io.users;

    return { show: function(){
        console.log(`< Usuário desconectado. Agora há ${String(users).padStart(2, "0")} usuário${users !== 1 ? 's' : '' } online no sistema.`)
    }}
}

Instance.prototype.install = function(...modules){
    modules.forEach( (modulo) => {
       if (typeof modulo !== 'function') return;
        if(!this.modules) this.modules = {};

        const nomeModulo = String(modulo.name).trim().toLowerCase();
        
        this.modules[nomeModulo] = new modulo({previousData: this.socket[nomeModulo], instance: this},);
        return this;
    })
}

Instance.prototype.initModules = function(){
    const modulos = (Object.keys(this.modules));
   
    console.log(`Iniciando ${modulos.length} módulo${modulos.length === 1 ? '' : 's'}`);

    modulos.forEach( modulo => {
        try {
            this.modules[modulo].init();
        } catch(e){
            console.log(`♦ Erro ao iniciar o módulo <${modulo}>:`, e.message)
        }
    })
}



module.exports = Instance;