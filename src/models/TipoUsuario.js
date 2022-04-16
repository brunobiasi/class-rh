const Sequelize = require('sequelize');
const database = require('../db');

const TipoUsuario = database.define('tipo_usuario', {
    cod_tipo_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome_tipo_usuario: {
        type: Sequelize.STRING(13),
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

module.exports = TipoUsuario;