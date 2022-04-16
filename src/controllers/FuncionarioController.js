const database = require('../db');
const Funcionario = require('../models/Funcionario');
const Setor = require('../models/Setor');

module.exports = {
    async index(req, res) {
        const funcionario = await Funcionario.findAll({
            attributes: {
                include: [
                    [database.fn('CONCAT', database.col('nome_funcionario'), ' ', database.col('sobrenome_funcionario')), 'nome_funcionario_completo']
                ],
                exclude: ['nome_funcionario', 'sobrenome_funcionario']
            },
            include: [Setor]
        });
        res.json(funcionario);
    },
    async create(req, res) {
        const { nome_funcionario, sobrenome_funcionario, cod_setor } = req.body;
        let data = { nome_funcionario, sobrenome_funcionario, cod_setor };

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