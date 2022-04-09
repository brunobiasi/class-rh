(async () => {
    const database = require('./src/db');

    const Contracheque = require('./src/models/Contracheque');
    const Funcionario = require('./src/models/Funcionario');
    const Post = require('./src/models/Post');

    await database.sync({force: true});
})();