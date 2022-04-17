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
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const mdTheme = createTheme();

function DashboardContent() {

    const [competenciaContracheque, setCompetenciaContracheque] = useState('');
    const [codFuncionario, setCodFuncionario] = useState('');

    const { cod_contracheque } = useParams();

    async function getContracheque() {
        var response = await api.get('/api/contracheque.details/' + cod_contracheque);

        setCompetenciaContracheque(response.data.competencia_contracheque);
        setCodFuncionario(response.data.cod_funcionario);
    }

    useEffect(() => {
        getContracheque();
    }, []);

    async function handleSubmit() {
        const data = {
            competencia_contracheque: competenciaContracheque,
        }

        if (competenciaContracheque !== '') {
            const response = await api.put('/api/contracheque', data);

            if (response.status === 200) {
                window.location.href = '/contracheque/' + codFuncionario;
            } else {
                alert('Erro ao atualizar o contracheque!');
            }
        } else {
            alert('Por favor, preencha todos os dados!');
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
                                <Button style={{ marginBottom: 10, marginRight: 5 }} variant="contained" href={'/contracheque/' + codFuncionario}><ArrowBackIcon />Voltar</Button>
                                <Button style={{ marginBottom: 10 }} variant="contained" href={'/contracheque/cadastrar/' + codFuncionario}><AddIcon />Cadastrar</Button>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <h2>Atualização de Contracheques</h2>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="competencia_contracheque"
                                                name="competencia_contracheque"
                                                label="Competência"
                                                fullWidth
                                                autoComplete="competencia_contracheque"
                                                variant="standard"
                                                value={competenciaContracheque}
                                                onChange={e => setCompetenciaContracheque(e.target.value)}
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

export default function ContrachequeEditar() {
    return <DashboardContent />;
}