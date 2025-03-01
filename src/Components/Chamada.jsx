import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Stack, Checkbox, Typography, Avatar, Switch, Button, Alert } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from '@mui/icons-material/Check';
import { buscaAlunos } from "../Service/buscaAlunos";
//import marcaPresenca from "../Service/marcaPresenca"
import separaPresenca from "../Utils/separaPresenca";
import statusPresenca from "../Service/statusPresenca";

const Chamada = ({ turmaId }) => {
  const [alunos, setAlunos] = useState([]);
  const [presenca, setPresenca] = useState({});
  const [todosSelecionados, setTodosSelecionados] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [status, setAlertStatus] = useState("success")
  const [message, setMessage] = useState("")

  // Busca alunos no banco de dados ao carregar o componente
  useEffect(() => {
    const fetchAlunos = async () => {
      const response = await buscaAlunos(turmaId);

      if (response && response.results) {
        // Ordena os alunos em ordem alfabética com base em name_student
        const alunosOrdenados = response.results.sort((a, b) =>
          a.name_student.localeCompare(b.name_student)
        );
  
        setAlunos(alunosOrdenados);
        const estadoInicialPresenca = response.results.reduce(
          (estado, aluno) => ({ ...estado, [aluno.id]: true }),
          {}
        );
        setPresenca(estadoInicialPresenca);
      }
    };

    if (turmaId) fetchAlunos();
  }, [turmaId]);

  const handleToggleTodos = (event) => {
    const selecionado = event.target.checked;
    setTodosSelecionados(selecionado);

    // Atualiza todos os estados de presença
    setPresenca((prev) =>
      Object.keys(prev).reduce(
        (estado, id) => ({ ...estado, [id]: selecionado }),
        {}
      )
    );
  };

  const handleCheckPresenca = (id) => {
    setPresenca((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sendPresenca = async () => {
    try {
      const lista = separaPresenca(alunos, presenca); // Função que separa alunos faltosos dos presentes
      //const response = await marcaPresenca(lista.presentes);
      // Envia os dados de presença para o banco de dados
      const response = await statusPresenca(lista.presentes);
  
      if (response == "turma_ja_chamada") { // Valor explícito para indicar chamada repetida
        setShowAlert(true);
        setAlertStatus("warning");
        setMessage("A chamada já foi realizada nessa turma.");
      } else if (response === true) { // Verifica se o envio foi bem-sucedido
        setShowAlert(true);
        setAlertStatus("success");
        setMessage("Envio confirmado com sucesso!");
      } else {
        setShowAlert(true);
        setAlertStatus("error");
        setMessage("Erro! Tente enviar mais tarde.");
      }
  
      // Oculta o alerta automaticamente após 3 segundos
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
  
    } catch (error) {
      console.error("Erro ao enviar a chamada:", error.message);
      setShowAlert(true);
      setAlertStatus("error");
      setMessage("Erro inesperado! Tente novamente mais tarde.");
  
      // Oculta o alerta automaticamente após 3 segundos
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };
  
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 2,
          bgcolor: "#f8f9fa",
          padding: 2,
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mr: 1 }}
        >
          <Typography variant="h6" fontWeight="400">
            Lista de Chamada
          </Typography>
          <Switch checked={todosSelecionados} onChange={handleToggleTodos} />
        </Stack>
        {alunos.map((aluno) => (
          <Stack
            key={aluno.id}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              padding: 2,
              borderRadius: 1,
              bgcolor: "#ffffff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "&:hover": {
                bgcolor: "#f1f3f5",
              },
            }}
          >
            {/* Nome do Aluno */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "#007bff", width: 32, height: 32 }}>
                <PersonIcon sx={{ color: "#ffffff" }} />
              </Avatar>
              <Typography variant="body1" fontWeight="500" sx={{ color: "#343a40" }}>
                {aluno.name_student}
              </Typography>
            </Box>
            {/* Checkbox de presença */}
            <Checkbox
              checked={presenca[aluno.id]}
              onChange={() => handleCheckPresenca(aluno.id)}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
            />
          </Stack>
        ))}

      </Box>
      {showAlert ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity={`${status}`} >
          {message}
        </Alert>
      ):
      <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end", // Alinha o botão à direita
        mt: 2, // Margem superior para espaçamento
        visibility:"visible"
      }}
    >
      <Button variant="contained" onClick={sendPresenca}>Enviar</Button>
      
    </Box>
    }
      

    </>
  );
};


Chamada.propTypes = {
  turmaId: PropTypes.number.isRequired,

};
export default Chamada;
