const Funcionario = require('../models/Funcionario');

module.exports = {
    async index(req, res) {
        const funcionario = await Funcionario.findAll();
        res.json(funcionario);
    },
    async create(req, res) {
        const { nome_funcionario, sobrenome_funcionario } = req.body;
        let data = { nome_funcionario, sobrenome_funcionario };

        funcionario = await Funcionario.create(data);
        return res.status(200).json(funcionario);
    },
    async details(req, res) {
        const { cod_funcionario } = req.params;
        const funcionario = await Funcionario.findByPk(cod_funcionario);
        res.json(funcionario);
    },
    async delete(req, res) {
        const { cod_funcionario } = req.params;
        const funcionario = await Funcionario.destroy({ where: { cod_funcionario } });
        return res.json(funcionario);
    },
    async update(req, res) {
        const { cod_funcionario, nome_funcionario, sobrenome_funcionario } = req.body;
        const data = { nome_funcionario, sobrenome_funcionario };
        const funcionario = await Funcionario.findByPk(cod_funcionario);
        funcionario.set(data);
        await funcionario.save();
        res.json(funcionario);
    },
}