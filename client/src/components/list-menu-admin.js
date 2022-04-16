import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { logout, getIdUsuario, getIdFuncionario, getTipoUsuario, getToken } from '../services/auth';
import api from '../services/api';

const cod_usuario = getIdUsuario();
const cod_funcionario = getIdFuncionario();
const tipo_usuario = getTipoUsuario();

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/agenda">
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Agenda" />
    </ListItem>
    {tipo_usuario === '1' ? (
      <ListItem button component="a" href="/contracheque">
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Contracheques" />
      </ListItem>
    ) : (
      <ListItem button component="a" href={"/contracheque/" + cod_usuario}>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Contracheques" />
      </ListItem>
    )}
    {tipo_usuario === '1' && (
      <ListItem button component="a" href="/funcionario">
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Funcionários" />
      </ListItem>
    )}
    <ListItem button component="a" href="/manual">
      <ListItemIcon>
        <AutoStoriesIcon />
      </ListItemIcon>
      <ListItemText primary="Manuais" />
    </ListItem>
    {tipo_usuario === '1' && (
      <ListItem button component="a" href="/setor">
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary="Setores" />
      </ListItem>
    )}
    {tipo_usuario === '1' ? (
      <ListItem button component="a" href="/usuario">
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuários" />
      </ListItem>
    ) : (
      <ListItem button component="a" href={"/usuario/" + cod_funcionario}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuário" />
      </ListItem>
    )}
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button onClick={confirmSair}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);

async function confirmSair() {
  if (window.confirm("Deseja realmente sair do sistema?")) {
    const response = await api.get('/api/usuario/destroytoken', { headers: { token: getToken() } });
    if (response.status === 200) {
      logout();
      window.location.href = '/login';
    } else {
      alert("Não foi possível fazer o logout!");
    }
  }
}