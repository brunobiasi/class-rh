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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import api from '../../services/api';

const mdTheme = createTheme();

function DashboardContent() {

    const [setor, setSetor] = useState([]);

    const [nomeFuncionario, setNomeFuncionario] = useState('');
    const [sobrenomeFuncionario, setSobrenomeFuncionario] = useState('');
    const [codSetor, setCodSetor] = useState('');

    async function loadSetor() {
        const response = await api.get("/api/setor");
        setSetor(response.data);
    }

    useEffect(() => {
        loadSetor();
    }, []);

    async function handleSubmit() {
        const data = {
            nome_funcionario: nomeFuncionario,
            sobrenome_funcionario: sobrenomeFuncionario,
            cod_setor: codSetor,
        }

        if (nomeFuncionario !== '' && sobrenomeFuncionario !== '' && codSetor !== '') {
            const response = await api.post('/api/funcionario', data);

            if (response.status === 200) {
                window.location.href = '/funcionario';
            } else {
                alert('Erro ao cadastrar o funcionário!');
            }
        } else {
            alert('Por favor, preencha todos os dados!');
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
                                <Button style={{ marginBottom: 10 }} variant="contained" href={'/funcionario'}><ArrowBackIcon />Voltar</Button>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <h2>Cadastro de Funcionários</h2>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="nome_funcionario"
                                                name="nome_funcionario"
                                                label="Nome"
                                                fullWidth
                                                autoComplete="nome_funcionario"
                                                variant="standard"
                                                value={nomeFuncionario}
                                                onChange={e => setNomeFuncionario(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="sobrenome_funcionario"
                                                name="sobrenome_funcionario"
                                                label="Sobrenome"
                                                fullWidth
                                                autoComplete="sobrenome_funcionario"
                                                variant="standard"
                                                value={sobrenomeFuncionario}
                                                onChange={e => setSobrenomeFuncionario(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <FormControl variant="standard" fullWidth>
                                                <InputLabel id="label_setor">Setor</InputLabel>
                                                <Select
                                                    labelId="label_setor"
                                                    id="cod_setor"
                                                    value={codSetor}
                                                    onChange={e => setCodSetor(e.target.value)}
                                                    label="cod_setor"
                                                >
                                                    {setor.map((row) => (
                                                        <MenuItem value={row.cod_setor}>{row.nome_setor}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
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

export default function FuncionarioCadastar() {
    return <DashboardContent />;
}