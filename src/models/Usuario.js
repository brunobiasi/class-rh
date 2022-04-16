const Sequelize = require('sequelize');
const database = require('../db');
const Funcionario = require('./Funcionario');
const TipoUsuario = require('./TipoUsuario');
const bcrypt = require('bcrypt');

const Usuario = database.define('usuario', {
    cod_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome_usuario: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    email_usuario: {
        type: Sequelize.STRING(60),
        allowNull: false,
    },
    password: {
        type: Sequelize.VIRTUAL,
        allowNull: false,
    },
    password_hash: {
        type: Sequelize.STRING(64),
    },
},
    {
        timestamps: false,
        hooks: {
            beforeSave: async usuario => {
                if (usuario.password.length < 50) {
                    usuario.password_hash = await bcrypt.hash(usuario.password, 8);
                }
            }
        }
    });

Usuario.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
}

Funcionario.hasOne(Usuario, {
    foreignKey: {
        name: 'cod_funcionario',
        allowNull: false,
    },
});

Usuario.belongsTo(Funcionario, {
    foreignKey: {
        name: 'cod_funcionario',
        allowNull: false,
    },
});

TipoUsuario.hasMany(Usuario, {
    foreignKey: {
        name: 'cod_tipo_usuario',
        allowNull: false,
    },
});

Usuario.belongsTo(TipoUsuario, {
    foreignKey: {
        name: 'cod_tipo_usuario',
        allowNull: false,
    },
});

module.exports = Usuario;