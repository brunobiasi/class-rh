import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './services/wAuth';

import Login from './pages/login';

import ContrachequeFuncionarioListar from './pages/contracheque/funcionario_listar';
import Contracheque from './pages/contracheque';
import ContrachequeCadastrar from './pages/contracheque/contracheque_cadastrar';
import ContrachequeDetalhes from './pages/contracheque/contracheque_detalhes';
import ContrachequeEditar from './pages/contracheque/contracheque_editar';

import Funcionario from './pages/funcionario';
import FuncionarioEditar from './pages/funcionario/funcionario_editar';
import FuncionarioCadastrar from './pages/funcionario/funcionario_cadastrar';

import Setor from './pages/setor';
import SetorEditar from './pages/setor/setor_editar';
import SetorCadastrar from './pages/setor/setor_cadastrar';

import TarefaSetorListar from './pages/tarefa/setor_listar';
import Tarefa from './pages/tarefa';
import TarefaEditar from './pages/tarefa/tarefa_editar';
import TarefaCadastrar from './pages/tarefa/tarefa_cadastrar';
import TarefaDetalhes from './pages/tarefa/tarefa_detalhes';

import UsuarioFuncionarioListar from './pages/usuario/funcionario_listar';
import Usuario from './pages/usuario';
import UsuarioEditar from './pages/usuario/usuario_editar';
import UsuarioCadastrar from './pages/usuario/usuario_cadastrar';

export default function RoutesAll() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />

                <PrivateRoute path="/contracheque" exact component={ContrachequeFuncionarioListar} />
                <PrivateRoute path="/contracheque/:cod_funcionario" exact component={Contracheque} />
                <PrivateRoute path="/contracheque/cadastrar/:cod_funcionario" exact component={ContrachequeCadastrar} />
                <PrivateRoute path="/contracheque/detalhes/:cod_contracheque" exact component={ContrachequeDetalhes} />
                <PrivateRoute path="/contracheque/editar/:cod_contracheque" exact component={ContrachequeEditar} />

                <PrivateRoute path="/funcionario" exact component={Funcionario} />
                <PrivateRoute path="/funcionario/cadastrar" exact component={FuncionarioCadastrar} />
                <PrivateRoute path="/funcionario/editar/:cod_funcionario" exact component={FuncionarioEditar} />

                <PrivateRoute path="/setor" exact component={Setor} />
                <PrivateRoute path="/setor/cadastrar" exact component={SetorCadastrar} />
                <PrivateRoute path="/setor/editar/:cod_setor" exact component={SetorEditar} />

                <PrivateRoute path="/" exact component={TarefaSetorListar} />
                <PrivateRoute path="/tarefa/:cod_setor" exact component={Tarefa} />
                <PrivateRoute path="/tarefa/cadastrar/:cod_setor" exact component={TarefaCadastrar} />
                <PrivateRoute path="/tarefa/editar/:cod_tarefa" exact component={TarefaEditar} />
                <PrivateRoute path="/tarefa/detalhes/:cod_tarefa" exact component={TarefaDetalhes} />

                <PrivateRoute path="/usuario" exact component={UsuarioFuncionarioListar} />
                <PrivateRoute path="/usuario/:cod_funcionario" exact component={Usuario} />
                <PrivateRoute path="/usuario/cadastrar/:cod_funcionario" exact component={UsuarioCadastrar} />
                <PrivateRoute path="/usuario/editar/:cod_usuario" exact component={UsuarioEditar} />
            </Switch>
        </BrowserRouter>
    )
}