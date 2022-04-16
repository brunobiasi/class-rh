import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuAdmin from '../../components/menu-admin';
import Footer from '../../components/footer-admin';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const mdTheme = createTheme();

function DashboardContent() {

  const [tipoUsuario, setTipoUsuario] = useState([]);

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [codTipoUsuario, setCodTipoUsuario] = useState('');
  const [codFuncionario, setCodFuncionario] = useState('');

  const { cod_usuario } = useParams();

  async function loadTipoUsuario() {
    const response = await api.get("/api/tipousuario");
    setTipoUsuario(response.data);
  }

  async function getUsuario() {
    var response = await api.get('/api/usuario.details/' + cod_usuario);

    setNomeUsuario(response.data.nome_usuario);
    setEmailUsuario(response.data.email_usuario);
    setPassword(response.data.password_hash);
    setCodTipoUsuario(response.data.cod_tipo_usuario);
    setCodFuncionario(response.data.cod_funcionario);
  }

  useEffect(() => {
    loadTipoUsuario();
    getUsuario();
  }, []);

  async function handleSubmit() {
    const data = {
      nome_usuario: nomeUsuario,
      email_usuario: emailUsuario,
      password: password,
      cod_tipo_usuario: codTipoUsuario,
      cod_usuario: cod_usuario,
    }

    if (nomeUsuario !== '' && emailUsuario !== '' && password !== '' && codTipoUsuario !== '') {
      const response = await api.put('/api/usuario', data);

      if (response.status === 200) {
        window.location.href = '/usuario/' + codFuncionario;
      } else {
        alert('Erro ao atualizar o usuário!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <MenuAdmin title={'USUÁRIOS'} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Button style={{ marginBottom: 10, marginRight: 5 }} variant="contained" href={'/usuario/' + codFuncionario}><ArrowBackIcon />Voltar</Button>
                <Button style={{ marginBottom: 10 }} variant="contained" href={'/usuario/cadastrar/' + codFuncionario}><AddIcon />Cadastrar</Button>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h2>Atualização de Usuários</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        required
                        id="nome_usuario"
                        name="nome_usuario"
                        label="Nome"
                        fullWidth
                        autoComplete="nome_usuario"
                        variant="standard"
                        value={nomeUsuario}
                        onChange={e => setNomeUsuario(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="email_usuario"
                        name="email_usuario"
                        label="Email"
                        fullWidth
                        autoComplete="email_usuario"
                        variant="standard"
                        value={emailUsuario}
                        onChange={e => setEmailUsuario(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="label_tipo_usuario">Tipo de Usuário</InputLabel>
                        <Select
                          labelId="label_tipo_usuario"
                          id="cod_tipo_usuario"
                          value={codTipoUsuario}
                          onChange={e => setCodTipoUsuario(e.target.value)}
                          label="cod_tipo_usuario"
                        >
                          {tipoUsuario.map((row) => (
                            <MenuItem value={row.cod_tipo_usuario}>{row.nome_tipo_usuario}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        type="password"
                        required
                        id="password"
                        name="password"
                        label="Senha"
                        fullWidth
                        autoComplete="password"
                        variant="standard"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Button style={{ backgroundColor: "green" }} variant="contained" onClick={handleSubmit}><SaveIcon />Salvar</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Footer sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function UsuarioEditar() {
  return <DashboardContent />;
}