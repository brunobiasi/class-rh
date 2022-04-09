const Sequelize = require('sequelize');
const database = require('../db');

const Contracheque = database.define('contracheque', {
    cod_contracheque: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    competencia_contracheque: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

module.exports = Contracheque;