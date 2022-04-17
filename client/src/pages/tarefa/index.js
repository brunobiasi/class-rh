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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { setDate, getDate, dateNow } from '../../services/date';
import { getTipoUsuario } from '../../services/auth';

const mdTheme = createTheme();

function DashboardContent() {

  const [data, setData] = useState(getDate() || dateNow());
  const [tarefa, setTarefa] = useState([]);

  const { cod_setor } = useParams();

  const tipo_usuario = getTipoUsuario();

  async function loadTarefa() {
    const response = await api.post("/api/tarefa", { data_tarefa: data, cod_setor });
    setTarefa(response.data);
  }

  useEffect(() => {
    loadTarefa();
    setDate('');
  }, []);

  async function handleDelete(cod_tarefa) {
    if (window.confirm("Deseja realmente excluir esta tarefa?")) {
      var result = await api.delete('/api/tarefa/' + cod_tarefa);
      if (result.status === 200) {
        setDate(data);
        window.location.href = '/tarefa/' + cod_setor;
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <MenuAdmin title={'AGENDA'} />
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
                <Grid container spacing={3} style={{ marginBottom: 10 }}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="data"
                      name="data"
                      fullWidth
                      autoComplete="data"
                      variant="outlined"
                      value={data}
                      onChange={e => setData(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button variant="contained" onClick={() => loadTarefa()}>Consultar</Button>
                  </Grid>
                </Grid>
                {tipo_usuario === '1' && (
                  <Button style={{ marginBottom: 10 }} variant="contained" href={'/tarefa/cadastrar/' + cod_setor}><AddIcon />Cadastrar</Button>
                )}
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h2>Listagem de Tarefas</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Hora</TableCell>
                              <TableCell align="center">Nome</TableCell>
                              <TableCell align="center">Descrição</TableCell>
                              <TableCell align="right">Opções</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tarefa.map((row) => (
                              <TableRow
                                key={row.cod_tarefa}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  {row.hora_tarefa}
                                </TableCell>
                                <TableCell align="center">{row.nome_tarefa}</TableCell>
                                <TableCell align="center">{row.descricao_tarefa}</TableCell>
                                <TableCell align="right">
                                  {tipo_usuario === '1' ? (
                                    <ButtonGroup aria-label="outlined primary button group">
                                      <Button variant="contained" href={'/tarefa/editar/' + row.cod_tarefa}><EditIcon /></Button>
                                      <Button variant="contained" onClick={() => handleDelete(row.cod_tarefa)}><DeleteIcon /></Button>
                                    </ButtonGroup>
                                  ) : (
                                    <Button variant="contained" href={'/tarefa/detalhes/' + row.cod_tarefa}><InfoIcon /></Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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

export default function TarefaListagem() {
  return <DashboardContent />;
}