const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const Post = require('../models/Post');

module.exports = {
    async index(req, res) {
        const post = await Post.findAll();
        res.json(post);
    },
    async create(req, res) {
        const { originalname: nome_post, size: size_post, filename: key_post } = req.file;

        const post = await Post.create({
            nome_post,
            size_post,
            key_post,
            url_post: `${process.env.APP_URL}/files/${key_post}`,
        });

        return res.json(post);
    },
    async details(req, res) {
        const { cod_post } = req.params;
        const post = await Post.findByPk(cod_post);
        res.json(post);
    },
    async delete(req, res) {
        const { cod_post } = req.params;

        const post = await Post.findByPk(cod_post);

        await promisify(fs.unlink)(
            path.resolve(__dirname, '..', '..', 'uploads', post.key_post)
        );

        await Post.destroy({ where: { cod_post } });

        return res.send();
    },
    async update(req, res) {
        const { cod_post, nome_post, size_post, key_post, url_post } = req.body;
        const data = { nome_post, size_post, key_post, url_post };
        const post = await Post.findByPk(cod_post);
        post.set(data);
        await post.save();
        res.json(post);
    },
}