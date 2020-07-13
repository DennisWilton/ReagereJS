function Module(name){
    this.moduleName = name;

    this.greetings();
}

Module.prototype.greetings = function(){
    console.log(`Instalando o módulo <${this.moduleName}>...`)
}



module.exports = Module;