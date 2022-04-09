(async () => {
    const database = require('./src/db');

    const Post = require('./src/models/Post');

    await database.sync({force: true});
})();