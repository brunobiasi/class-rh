const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const multerConfig = require('./config/multer');

const Post = require('./models/Post');

const routes = express.Router();

routes.get("/posts", async (req, res) => {
    const posts = await Post.findAll();

    return res.json(posts);
});

routes.post("/posts", multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: nome_post, size: size_post, filename: key_post } = req.file;

    const post = await Post.create({
        nome_post,
        size_post,
        key_post,
        url_post: `${process.env.APP_URL}/files/${key_post}`,
    });

    return res.json(post);
});

routes.delete("/posts/:cod_post", async (req, res) => {
    const { cod_post } = req.params;

    const post = await Post.findByPk(cod_post);

    await promisify(fs.unlink)(
        path.resolve(__dirname, '..', 'uploads', post.key_post)
    );

    await Post.destroy({ where: { cod_post } });

    return res.send();
});

module.exports = routes;