const Setor = require('../models/Setor');

module.exports = {
    async index(req, res) {
        const setor = await Setor.findAll();
        res.json(setor);
    },
    async create(req, res) {
        const { nome_setor } = req.body;
        let data = {};
        let setor = await Setor.findOne({ where: { nome_setor } });

        if (!setor) {
            data = { nome_setor };

            setor = await Setor.create(data);
            return res.status(200).json(setor);
        } else {
            return res.status(500).json(setor);
        }
    },
    async details(req, res) {
        const { cod_setor } = req.params;
        const setor = await Setor.findByPk(cod_setor);
        res.json(setor);
    },
    async delete(req, res) {
        const { cod_setor } = req.params;
        const setor = await Setor.destroy({ where: { cod_setor } });
        return res.json(setor);
    },
    async update(req, res) {
        const { cod_setor, nome_setor } = req.body;
        const data = { nome_setor };
        const setor = await Setor.findByPk(cod_setor);
        setor.set(data);
        await setor.save();
        res.json(setor);
    },
}