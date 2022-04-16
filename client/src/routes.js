import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './services/wAuth';

import Login from './pages/login';

import FuncionarioListar from './pages/contracheque/funcionario_listar';
import Contracheque from './pages/contracheque';
import ContrachequeCadastrar from './pages/contracheque/contracheque_cadastrar';

import Funcionario from './pages/funcionario';
import FuncionarioEditar from './pages/funcionario/funcionario_editar';
import FuncionarioCadastrar from './pages/funcionario/funcionario_cadastrar';

import Setor from './pages/setor';
import SetorEditar from './pages/setor/setor_editar';
import SetorCadastrar from './pages/setor/setor_cadastrar';

import Usuario from './pages/usuario';
import UsuarioEditar from './pages/usuario/usuario_editar';
import UsuarioCadastrar from './pages/usuario/usuario_cadastrar';

export default function RoutesAll() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />

                <PrivateRoute path="/" exact component={FuncionarioListar} />
                <PrivateRoute path="/contracheque/:cod_funcionario" exact component={Contracheque} />
                <PrivateRoute path="/contracheque/cadastrar/:cod_funcionario" exact component={ContrachequeCadastrar} />

                <PrivateRoute path="/funcionario" exact component={Funcionario} />
                <PrivateRoute path="/funcionario/cadastrar" exact component={FuncionarioCadastrar} />
                <PrivateRoute path="/funcionario/editar/:cod_funcionario" exact component={FuncionarioEditar} />

                <PrivateRoute path="/setor" exact component={Setor} />
                <PrivateRoute path="/setor/cadastrar" exact component={SetorCadastrar} />
                <PrivateRoute path="/setor/editar/:cod_setor" exact component={SetorEditar} />

                <PrivateRoute path="/usuario" exact component={Usuario} />
                <PrivateRoute path="/usuario/cadastrar" exact component={UsuarioCadastrar} />
                <PrivateRoute path="/usuario/editar/:cod_usuario" exact component={UsuarioEditar} />
            </Switch>
        </BrowserRouter>
    )
}