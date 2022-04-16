require('dotenv').config();

const Usuario = require('../models/Usuario');
const TipoUsuario = require('../models/TipoUsuario');
const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET;

module.exports = {
    async index(req, res) {
        const { cod_funcionario } = req.params;
        const usuario = await Usuario.findAll({
            where: { cod_funcionario },
            include: [TipoUsuario]
        });
        res.json(usuario);
    },
    async create(req, res) {
        const { cod_funcionario } = req.params;
        const { nome_usuario, email_usuario, password, cod_tipo_usuario } = req.body;
        let data = {};
        let usuario = await Usuario.findOne({ where: { email_usuario } });

        if (!usuario) {
            data = { nome_usuario, email_usuario, password, cod_tipo_usuario, cod_funcionario };

            usuario = await Usuario.create(data);
            return res.status(200).json(usuario);
        } else {
            return res.status(500).json(usuario);
        }
    },
    async details(req, res) {
        const { cod_usuario } = req.params;
        const usuario = await Usuario.findByPk(cod_usuario);
        res.json(usuario);
    },
    async delete(req, res) {
        const { cod_usuario } = req.params;
        const usuario = await Usuario.destroy({ where: { cod_usuario } });
        return res.json(usuario);
    },
    async update(req, res) {
        const { cod_usuario, nome_usuario, email_usuario, password, cod_tipo_usuario } = req.body;
        const data = { nome_usuario, email_usuario, password, cod_tipo_usuario };
        const usuario = await Usuario.findByPk(cod_usuario);
        usuario.set(data);
        await usuario.save();
        res.json(usuario);
    },
    async login(req, res) {
        const { email_usuario, password } = req.body;

        const usuario = await Usuario.findOne({ where: { email_usuario } });

        if (!usuario) {
            return res.status(200).json({ status: 2, error: "E-mail não encontrado no banco de dados" });
        }

        if (!(await usuario.checkPassword(password))) {
            return res.status(200).json({ status: 2, error: "A senha não confere" });
        } else {
            const payload = { email_usuario };
            const token = jwt.sign(payload, secret, {
                expiresIn: '24h'
            });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ status: 1, auth: true, token: token, id_client: usuario.cod_usuario, user_name: usuario.nome_usuario, id_funcionario: usuario.cod_funcionario, user_type: usuario.cod_tipo_usuario });
        }
    },
    async checkToken(req, res) {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];
        if (!token) {
            res.json({ status: 401, msg: "Não autorizado: Token inexistente!" });
        } else {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ status: 401, msg: "Não autorizado: Token inválido!" });
                } else {
                    res.json({ status: 200 });
                }
            });
        }
    },
    async destroyToken(req, res) {
        const token = req.headers.token;
        if (token) {
            res.cookie('token', null, { httpOnly: true });
        } else {
            res.status(401).send("Logout não autorizado!");
        }
        res.send("Sessão finalizada com sucesso!");
    }
}