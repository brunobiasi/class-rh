const Contracheque = require('../models/Contracheque');

module.exports = {
    async index(req, res) {
        const contracheque = await Contracheque.findAll();
        res.json(contracheque);
    },
    async create(req, res) {
        const { competencia_contracheque } = req.body;
        let data = {};
        let contracheque = await Contracheque.findOne({ where: { competencia_contracheque } });

        if (!contracheque) {
            data = { competencia_contracheque };

            contracheque = await Contracheque.create(data);
            return res.status(200).json(contracheque);
        } else {
            return res.status(500).json(contracheque);
        }
    },
    async details(req, res) {
        const { cod_contracheque } = req.params;
        const contracheque = await Contracheque.findByPk(cod_contracheque);
        res.json(contracheque);
    },
    async delete(req, res) {
        const { cod_contracheque } = req.params;
        const contracheque = await Contracheque.destroy({ where: { cod_contracheque } });
        return res.json(contracheque);
    },
    async update(req, res) {
        const { cod_contracheque, competencia_contracheque } = req.body;
        const data = { competencia_contracheque };
        const contracheque = await Contracheque.findByPk(cod_contracheque);
        contracheque.set(data);
        await contracheque.save();
        res.json(contracheque);
    },
}