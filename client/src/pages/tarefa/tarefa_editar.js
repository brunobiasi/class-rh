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

    const [dataTarefa, setDataTarefa] = useState('');
    const [horaTarefa, setHoraTarefa] = useState('');
    const [nomeTarefa, setNomeTarefa] = useState('');
    const [descricaoTarefa, setDescricaoTarefa] = useState('');
    const [codSetor, setCodSetor] = useState('');

    const { cod_tarefa } = useParams();

    async function getTarefa() {
        var response = await api.get('/api/tarefa.details/' + cod_tarefa);

        setDataTarefa(response.data.data_tarefa);
        setHoraTarefa(response.data.hora_tarefa);
        setNomeTarefa(response.data.nome_tarefa);
        setDescricaoTarefa(response.data.descricao_tarefa);
        setCodSetor(response.data.cod_setor);
    }

    useEffect(() => {
        getTarefa();
    }, []);

    async function handleSubmit() {
        const data = {
            data_tarefa: dataTarefa,
            hora_tarefa: horaTarefa,
            nome_tarefa: nomeTarefa,
            descricao_tarefa: descricaoTarefa,
            cod_tarefa: parseInt(cod_tarefa),
        }

        if (dataTarefa !== '' && horaTarefa !== '' && nomeTarefa !== '' && descricaoTarefa !== '') {
            const response = await api.put('/api/tarefa', data);

            if (response.status === 200) {
                window.location.href = '/tarefa/' + codSetor;
            } else {
                alert('Erro ao atualizar a tarefa!');
            }
        } else {
            alert('Por favor, preencha todos os dados!');
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
                                <Button style={{ marginBottom: 10, marginRight: 5 }} variant="contained" href={'/tarefa/' + codSetor}><ArrowBackIcon />Voltar</Button>
                                <Button style={{ marginBottom: 10 }} variant="contained" href={'/tarefa/cadastrar/' + codSetor}><AddIcon />Cadastrar</Button>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <h2>Atualização de Tarefas</h2>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="data_tarefa"
                                                name="data_tarefa"
                                                label="Data"
                                                fullWidth
                                                autoComplete="data_tarefa"
                                                variant="standard"
                                                value={dataTarefa}
                                                onChange={e => setDataTarefa(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="hora_tarefa"
                                                name="hora_tarefa"
                                                label="Hora"
                                                fullWidth
                                                autoComplete="hora_tarefa"
                                                variant="standard"
                                                value={horaTarefa}
                                                onChange={e => setHoraTarefa(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="nome_tarefa"
                                                name="nome_tarefa"
                                                label="Nome"
                                                fullWidth
                                                autoComplete="nome_tarefa"
                                                variant="standard"
                                                value={nomeTarefa}
                                                onChange={e => setNomeTarefa(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="descricao_tarefa"
                                                name="descricao_tarefa"
                                                label="Descrição"
                                                fullWidth
                                                autoComplete="descricao_tarefa"
                                                variant="standard"
                                                value={descricaoTarefa}
                                                onChange={e => setDescricaoTarefa(e.target.value)}
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

export default function TarefaEditar() {
    return <DashboardContent />;
}