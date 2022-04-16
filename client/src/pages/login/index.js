import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../services/api';
import { login, setIdUsuario, setNomeUsuario, setTipoUsuario, setIdFuncionario } from '../../services/auth';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                ClassRH
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        await api.post('/api/usuario/login', { email_usuario: email, password: password })
            .then(res => {
                if (res.status === 200) {
                    if (res.data.status === 1) {
                        login(res.data.token);
                        setIdUsuario(res.data.id_client);
                        setNomeUsuario(res.data.user_name);
                        setIdFuncionario(res.data.id_funcionario);
                        setTipoUsuario(res.data.user_type);

                        window.location.href = '/';
                    } else if (res.data.status === 2) {
                        alert("Atenção: " + res.data.error);
                    }
                    setLoading(false);
                } else {
                    alert("Erro no servidor");
                    setLoading(false);
                }
            })
    }

    function loadSubmit() {
        setLoading(true);
        setTimeout(
            () => handleSubmit(),
            2000
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Digite seu email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="campoSenha">Digite sua senha</InputLabel>
                            <OutlinedInput
                                id="campoSenha"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={e => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Digite sua senha"
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={loadSubmit}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress /> : "ENTRAR"}
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}