const Sequelize = require('sequelize');
const database = require('../db');

const Setor = database.define('setor', {
    cod_setor: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome_setor: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

module.exports = Setor;