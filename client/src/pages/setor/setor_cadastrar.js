import { useState } from 'react';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import api from '../../services/api';

const mdTheme = createTheme();

function DashboardContent() {

    const [nomeSetor, setNomeSetor] = useState('');

    async function handleSubmit() {
        const data = {
            nome_setor: nomeSetor,
        }

        if (nomeSetor !== '') {
            const response = await api.post('/api/setor', data);

            if (response.status === 200) {
                window.location.href = '/setor';
            } else {
                alert('Erro ao cadastrar o setor!');
            }
        } else {
            alert('Por favor, preencha todos os dados!');
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
                                <Button style={{ marginBottom: 10 }} variant="contained" href={'/setor'}><ArrowBackIcon />Voltar</Button>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <h2>Cadastro de Setores</h2>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="nome_setor"
                                                name="nome_setor"
                                                label="Nome"
                                                fullWidth
                                                autoComplete="nome_setor"
                                                variant="standard"
                                                value={nomeSetor}
                                                onChange={e => setNomeSetor(e.target.value)}
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

export default function SetorCadastar() {
    return <DashboardContent />;
}