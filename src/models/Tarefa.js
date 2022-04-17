const Sequelize = require('sequelize');
const database = require('../db');
const Setor = require('./Setor');

const Tarefa = database.define('tarefa', {
    cod_tarefa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    data_tarefa: {
        type: Sequelize.STRING(10),
        allowNull: false,
    },
    hora_tarefa: {
        type: Sequelize.STRING(5),
        allowNull: false,
    },
    nome_tarefa: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    descricao_tarefa: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
},
    {
        timestamps: false,
    });

Setor.hasMany(Tarefa, {
    foreignKey: {
        name: 'cod_setor',
        allowNull: false,
    },
});

Tarefa.belongsTo(Setor, {
    foreignKey: {
        name: 'cod_setor',
        allowNull: false,
    },
});

module.exports = Tarefa;