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
import LinearProgress from '@mui/material/LinearProgress';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const mdTheme = createTheme();

function DashboardContent() {

  const [contracheque, setContracheque] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cod_funcionario } = useParams();

  async function loadContracheque() {
    const response = await api.get("/api/contracheque/" + cod_funcionario);
    setContracheque(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadContracheque();
  }, []);

  async function handleDelete(cod_contracheque) {
    if (window.confirm("Deseja realmente excluir este contracheque?")) {
      var result = await api.delete('/api/contracheque/' + cod_contracheque);
      if (result.status === 200) {
        window.location.href = '/contracheque/' + cod_funcionario;
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <MenuAdmin title={'CONTRACHEQUES'} />
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
                <Button style={{ marginBottom: 10, marginRight: 5 }} variant="contained" href={'/contracheque'}><ArrowBackIcon />Voltar</Button>
                <Button style={{ marginBottom: 10 }} variant="contained" href={'/contracheque/cadastrar/' + cod_funcionario}><AddIcon />Cadastrar</Button>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <h2>Listagem de Contracheques</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        {loading ? (<LinearProgress style={{ width: '50%', margin: '20px auto' }} />) : (
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>Competência</TableCell>
                                <TableCell align="center">Arquivo</TableCell>
                                <TableCell align="right">Opções</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {contracheque.map((row) => (
                                <TableRow
                                  key={row.cod_contracheque}
                                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                  <TableCell component="th" scope="row">
                                    {row.competencia_contracheque}
                                  </TableCell>
                                  <TableCell align="center"><a href={'http://localhost:5000/files/' + row.key_contracheque} target='_blank'>{row.nome_contracheque}</a></TableCell>
                                  <TableCell align="right">
                                    <Button variant="contained" onClick={() => handleDelete(row.cod_contracheque)}><DeleteIcon /></Button>
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

export default function ContrachequeListagem() {
  return <DashboardContent />;
}