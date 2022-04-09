const Sequelize = require('sequelize');
const database = require('../db');

const Funcionario = database.define('funcionario', {
    cod_funcionario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome_funcionario: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    sobrenome_funcionario: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

module.exports = Funcionario;