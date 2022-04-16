(async () => {
    const database = require('./src/db');

    const Contracheque = require('./src/models/Contracheque');
    const Funcionario = require('./src/models/Funcionario');
    const Setor = require('./src/models/Setor');
    const TipoUsuario = require('./src/models/TipoUsuario');
    const Usuario = require('./src/models/Usuario');

    await database.sync({force: true});
})();