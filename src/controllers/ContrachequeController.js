const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const Contracheque = require('../models/Contracheque');

module.exports = {
    async index(req, res) {
        const { cod_funcionario } = req.params;
        const contracheque = await Contracheque.findAll({ where: { cod_funcionario } });
        res.json(contracheque);
    },
    async create(req, res) {
        const { originalname: nome_contracheque, size: size_contracheque, filename: key_contracheque } = req.file;
        const { competencia_contracheque, cod_funcionario } = req.body;

        const contracheque = await Contracheque.create({
            nome_contracheque,
            competencia_contracheque,
            size_contracheque,
            key_contracheque,
            url_contracheque: `${process.env.APP_URL}/files/${key_contracheque}`,
            cod_funcionario
        });

        return res.json(contracheque);
    },
    async details(req, res) {
        const { cod_contracheque } = req.params;
        const contracheque = await Contracheque.findByPk(cod_contracheque);
        res.json(contracheque);
    },
    async delete(req, res) {
        const { cod_contracheque } = req.params;

        const contracheque = await Contracheque.findByPk(cod_contracheque);

        await promisify(fs.unlink)(
            path.resolve(__dirname, '..', '..', 'uploads', contracheque.key_contracheque)
        );

        await Contracheque.destroy({ where: { cod_contracheque } });

        return res.send();
    },
    async update(req, res) {
        const { cod_contracheque, nome_contracheque, competencia_contracheque, size_contracheque, key_contracheque, url_contracheque, cod_funcionario } = req.body;
        const data = { nome_contracheque, competencia_contracheque, size_contracheque, key_contracheque, url_contracheque, cod_funcionario };
        const contracheque = await Contracheque.findByPk(cod_contracheque);
        contracheque.set(data);
        await contracheque.save();
        res.json(contracheque);
    },
}