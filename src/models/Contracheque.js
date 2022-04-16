const Sequelize = require('sequelize');
const database = require('../db');
const Funcionario = require('./Funcionario');

const Contracheque = database.define('contracheque', {
    cod_contracheque: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome_contracheque: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    competencia_contracheque: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    size_contracheque: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    key_contracheque: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    url_contracheque: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

Funcionario.hasMany(Contracheque, {
    foreignKey: {
        name: 'cod_funcionario',
        allowNull: false,
    },
});

Contracheque.belongsTo(Funcionario, {
    foreignKey: {
        name: 'cod_funcionario',
        allowNull: false,
    },
});

module.exports = Contracheque;