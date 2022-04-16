const TipoUsuario = require('../models/TipoUsuario');

module.exports = {
    async index(req, res) {
        const tipo_usuario = await TipoUsuario.findAll();
        res.json(tipo_usuario);
    },
    async create(req, res) {
        const { nome_tipo_usuario } = req.body;
        let data = {};
        let tipo_usuario = await TipoUsuario.findOne({ where: { nome_tipo_usuario } });

        if (!tipo_usuario) {
            data = { nome_tipo_usuario };

            tipo_usuario = await TipoUsuario.create(data);
            return res.status(200).json(tipo_usuario);
        } else {
            return res.status(500).json(tipo_usuario);
        }
    },
    async details(req, res) {
        const { cod_tipo_usuario } = req.params;
        const tipo_usuario = await TipoUsuario.findByPk(cod_tipo_usuario);
        res.json(tipo_usuario);
    },
    async delete(req, res) {
        const { cod_tipo_usuario } = req.params;
        const tipo_usuario = await TipoUsuario.destroy({ where: { cod_tipo_usuario } });
        return res.json(tipo_usuario);
    },
    async update(req, res) {
        const { cod_tipo_usuario, nome_tipo_usuario } = req.body;
        const data = { nome_tipo_usuario };
        const tipo_usuario = await TipoUsuario.findByPk(cod_tipo_usuario);
        tipo_usuario.set(data);
        await tipo_usuario.save();
        res.json(tipo_usuario);
    },
}