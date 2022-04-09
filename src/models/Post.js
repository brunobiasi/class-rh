const Sequelize = require('sequelize');
const database = require('../db');

const Post = database.define('post', {
    cod_post: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome_post: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    size_post: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    key_post: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    url_post: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

module.exports = Post;