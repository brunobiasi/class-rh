const express = require('express');
const multer = require('multer');
const ContrachequeMulter = require('./config/ContrachequeMulter');

const routes = express.Router();

const ContrachequeController = require('./controllers/ContrachequeController');
const FuncionarioController = require('./controllers/FuncionarioController');
const SetorController = require('./controllers/SetorController');
const TipoUsuarioController = require('./controllers/TipoUsuarioController');
const UsuarioController = require('./controllers/UsuarioController');

// Rotas - Contracheque
routes.post('/api/contracheque', multer(ContrachequeMulter).single('file'), ContrachequeController.create);
routes.get('/api/contracheque/:cod_funcionario', ContrachequeController.index);
routes.get('/api/contracheque.details/:cod_contracheque', ContrachequeController.details);
routes.delete('/api/contracheque/:cod_contracheque', ContrachequeController.delete);
routes.put('/api/contracheque', ContrachequeController.update);

// Rotas - Funcionario
routes.post('/api/funcionario', FuncionarioController.create);
routes.get('/api/funcionario', FuncionarioController.index);
routes.get('/api/funcionario.details/:cod_funcionario', FuncionarioController.details);
routes.delete('/api/funcionario/:cod_funcionario', FuncionarioController.delete);
routes.put('/api/funcionario', FuncionarioController.update);

// Rotas - Setor
routes.post('/api/setor', SetorController.create);
routes.get('/api/setor', SetorController.index);
routes.get('/api/setor.details/:cod_setor', SetorController.details);
routes.delete('/api/setor/:cod_setor', SetorController.delete);
routes.put('/api/setor', SetorController.update);

// Rotas - TipoUsuario
routes.post('/api/tipousuario', TipoUsuarioController.create);
routes.get('/api/tipousuario', TipoUsuarioController.index);
routes.get('/api/tipousuario.details/:cod_tipo_usuario', TipoUsuarioController.details);
routes.delete('/api/tipousuario/:cod_tipo_usuario', TipoUsuarioController.delete);
routes.put('/api/tipousuario', TipoUsuarioController.update);

// Rotas - Usuario
routes.post('/api/usuario/login', UsuarioController.login);
routes.post('/api/usuario/:cod_funcionario', UsuarioController.create);
routes.get('/api/usuario/checktoken', UsuarioController.checkToken);
routes.get('/api/usuario/destroytoken', UsuarioController.destroyToken);
routes.get('/api/usuario/:cod_funcionario', UsuarioController.index);
routes.get('/api/usuario.details/:cod_usuario', UsuarioController.details);
routes.delete('/api/usuario/:cod_usuario', UsuarioController.delete);
routes.put('/api/usuario', UsuarioController.update);

module.exports = routes;