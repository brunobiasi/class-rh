const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const ContrachequeController = require('./controllers/ContrachequeController');
const FuncionarioController = require('./controllers/FuncionarioController');
const PostController = require('./controllers/PostController');

// Rotas - Contracheque
routes.post('/api/contracheque', ContrachequeController.create);
routes.post('/api/contracheque/all', ContrachequeController.index);
routes.get('/api/contracheque.details/:cod_contracheque', ContrachequeController.details);
routes.delete('/api/contracheque/:cod_contracheque', ContrachequeController.delete);
routes.put('/api/contracheque', ContrachequeController.update);

// Rotas - Funcionario
routes.post('/api/funcionario', FuncionarioController.create);
routes.get('/api/funcionario', FuncionarioController.index);
routes.get('/api/funcionario.details/:cod_funcionario', FuncionarioController.details);
routes.delete('/api/funcionario/:cod_funcionario', FuncionarioController.delete);
routes.put('/api/funcionario', FuncionarioController.update);

// Rotas - Post
routes.post('/api/post', multer(multerConfig).single('file'), PostController.create);
routes.get('/api/post', PostController.index);
routes.get('/api/post.details/:cod_post', PostController.details);
routes.delete('/api/post/:cod_post', PostController.delete);
routes.put('/api/post', PostController.update);

module.exports = routes;