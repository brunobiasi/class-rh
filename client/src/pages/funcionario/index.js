import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuAdmin from '../../components/menu-admin';
import Footer from '../../components/footer-admin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/api';

const mdTheme = createTheme();

function DashboardContent() {

  const [funcionario, setFuncionario] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadFuncionario() {
    const response = await api.get("/api/funcionario");
    setFuncionario(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadFuncionario();
  }, []);

  async function handleDelete(cod_funcionario) {
    if (window.confirm("Deseja realmente excluir este funcionário?")) {
      var result = await api.delete('/api/funcionario/' + cod_funcionario);
      if (result.status === 200) {
        window.location.href = '/funcionario';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <MenuAdmin title={'FUNCIONÁRIOS'} />
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
                <Button style={{ marginBottom: 10 }} variant="contained" href={'/funcionario/cadastrar'}><AddIcon />Cadastrar</Button>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h2>Listagem de Funcionários</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        {loading ? (<LinearProgress style={{ width: '50%', margin: '20px auto' }} />) : (
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="center">Setor</TableCell>
                                <TableCell align="right">Opções</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {funcionario.map((row) => (
                                <TableRow
                                  key={row.cod_funcionario}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.nome_funcionario_completo}
                                  </TableCell>
                                  <TableCell align="center">{row.setor.nome_setor}</TableCell>
                                  <TableCell align="right">
                                    <ButtonGroup aria-label="outlined primary button group">
                                      <Button variant="contained" href={'/funcionario/editar/' + row.cod_funcionario}><EditIcon /></Button>
                                      <Button variant="contained" onClick={() => handleDelete(row.cod_funcionario)}><DeleteIcon /></Button>
                                    </ButtonGroup>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>)}
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

export default function FuncionarioListagem() {
  return <DashboardContent />;
}