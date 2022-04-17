const Tarefa = require('../models/Tarefa');

module.exports = {
    async index(req, res) {
        const { data_tarefa, cod_setor } = req.body;
        const tarefa = await Tarefa.findAll({ where: { data_tarefa, cod_setor }, order: [['hora_tarefa', 'ASC']] });
        res.json(tarefa);
    },
    async create(req, res) {
        const { data_tarefa, hora_tarefa, nome_tarefa, descricao_tarefa, cod_setor } = req.body;

        let data = {};
        data = { data_tarefa, hora_tarefa, nome_tarefa, descricao_tarefa, cod_setor };

        const tarefa = await Tarefa.create(data);
        return res.status(200).json(tarefa);
    },
    async details(req, res) {
        const { cod_tarefa } = req.params;
        const tarefa = await Tarefa.findByPk(cod_tarefa);
        res.json(tarefa);
    },
    async delete(req, res) {
        const { cod_tarefa } = req.params;
        const tarefa = await Tarefa.destroy({ where: { cod_tarefa } });
        return res.json(tarefa);
    },
    async update(req, res) {
        const { cod_tarefa, data_tarefa, hora_tarefa, nome_tarefa, descricao_tarefa } = req.body;
        const data = { data_tarefa, hora_tarefa, nome_tarefa, descricao_tarefa };
        const tarefa = await Tarefa.findByPk(cod_tarefa);
        tarefa.set(data);
        await tarefa.save();
        res.json(tarefa);
    },
}