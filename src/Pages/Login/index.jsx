import { useState } from 'react';
import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import Oauth from '../../Hooks/Oauth';


// Tema padrão
const lightTheme = createTheme({
  palette: {
    primary: {
      light: "#81d4fa",
      main: "#29b6f6",
      dark: "#0288d1",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

// Tema de erro
const errorTheme = createTheme({
  palette: {
    primary: {
      light: "#ff7961",
      main: "#f44336", // Cor principal para refletir erro
      dark: "#ba000d",
      contrastText: "#fff",
    },
    secondary: {
      light: "#81d4fa",
      main: "#29b6f6",
      dark: "#0288d1",
      contrastText: "#000",
    },
  },
});

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(lightTheme); // Estado para o tema atual
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagem de erro

  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    const promise = await Oauth(username, password);

    if (promise) {
      localStorage.setItem("authToken", promise.token); // Armazena o token ou flag de autenticação
      navigate("/painel"); // Redireciona para o painel
    } else {
      setErrorMessage("Usuário ou senha incorretos."); // Atualiza a mensagem de erro
      setCurrentTheme(errorTheme); // Atualiza o tema para refletir erro
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: currentTheme.palette.primary.main, // Cor principal do tema atual
              textAlign: "center",
              mb: 1,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{display:'flex', justifyContent:'center'}}>
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              placeholder="Nome de usuário"
              fullWidth
              required
              autoFocus
              sx={{ mb: 2 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Atualiza o valor do nome de usuário
            />

            <TextField
              placeholder="Digite sua senha"
              fullWidth
              required
              type="password"
              sx={{ mb: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o valor da senha
            />

            {/* Renderização condicional da mensagem de erro */}
            {errorMessage && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mb: 2, textAlign: "left" }}
              >
                {errorMessage}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)} // Atualiza o valor de 'Lembrar-me'
                />
              }
              label="Remember me"
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
            >
              Log In
            </Button>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

