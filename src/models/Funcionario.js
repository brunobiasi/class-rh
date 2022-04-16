const Sequelize = require('sequelize');
const database = require('../db');
const Setor = require('./Setor');

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

Setor.hasMany(Funcionario, {
    foreignKey: {
        name: 'cod_setor',
        allowNull: false,
    },
});

Funcionario.belongsTo(Setor, {
    foreignKey: {
        name: 'cod_setor',
        allowNull: false,
    },
});

module.exports = Funcionario;