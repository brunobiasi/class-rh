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

  const [setor, setSetor] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSetor() {
    const response = await api.get("/api/setor");
    setSetor(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadSetor();
  }, []);

  async function handleDelete(cod_setor) {
    if (window.confirm("Deseja realmente excluir este setor?")) {
      var result = await api.delete('/api/setor/' + cod_setor);
      if (result.status === 200) {
        window.location.href = '/setor';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <MenuAdmin title={'SETORES'} />
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
                <Button style={{ marginBottom: 10 }} variant="contained" href={'/setor/cadastrar'}><AddIcon />Cadastrar</Button>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h2>Listagem de Setores</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        {loading ? (<LinearProgress style={{ width: '50%', margin: '20px auto' }} />) : (
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">Opções</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {setor.map((row) => (
                                <TableRow
                                  key={row.cod_setor}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.nome_setor}
                                  </TableCell>
                                  <TableCell align="right">
                                    <ButtonGroup aria-label="outlined primary button group">
                                      <Button variant="contained" href={'/setor/editar/' + row.cod_setor}><EditIcon /></Button>
                                      <Button variant="contained" onClick={() => handleDelete(row.cod_setor)}><DeleteIcon /></Button>
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

export default function SetorListagem() {
  return <DashboardContent />;
}