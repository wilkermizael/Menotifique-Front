import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { CadastroTurma } from "../Service/cadastro_turma";
import renderizaTurma from "../Pages/Painel/renderizaTurma";

const AddTurma = () => {
  const [isOpen, setOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // Novo estado para controlar o envio
  const [serie, setSerie] = useState("");
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [ano, setAno] = useState("");
  const [errors, setErrors] = useState({
    serie: false,
    turma: false,
    turno: false,
    ano: false,
  });

  const handleClick = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Marca que houve tentativa de salvar

    // Validação dos campos
    const newErrors = {
      serie: !serie.trim(),
      turma: !turma.trim(),
      turno: !turno.trim(),
      ano: !ano.trim(),
    };

    setErrors(newErrors);

    // Verifique se há erros
    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      setIsSubmitting(false); // Reseta o indicador de envio
      setOpen(!isOpen); // Fecha o formulário
      setSerie("") // Reseta todos os campos
      setTurma("")
      setTurno("")
      setAno("")
      const resposta = await CadastroTurma(serie, turma, turno, ano) // Realiza cadastro das turmas
      const response = await renderizaTurma() // Busca todas as turmas
      console.log( resposta)
    } else {
      alert("Preencha todos os campos obrigatórios.");
    }
  };

  return (
    <>
      {isOpen ? (
        
        
        <Box
          onClick={() => setOpen(!isOpen)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "80%", sm: "50%", md: "30%", lg: "18%" },
            height: { xs: "10vh", md: "15vh" },
            opacity: 0.8,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            borderRadius: "8px",
            border: "2px dashed",
            m: 2,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Adicionar Turma
          </Typography>
        </Box>
      ) : (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "flex-start",
            gap: 2,
            width: "100%",
            maxWidth: 400,
            margin: "0 auto",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h6">Dados da turma</Typography>  
          <TextField
            id="serie-field"
            value={serie}
            label="Série"
            variant="outlined"
            required
            error={isSubmitting && errors.serie} // Exibe erro somente após tentar salvar
            helperText={isSubmitting && errors.serie ? "Campo obrigatório" : ""}
            onChange={(event) => setSerie(event.target.value)}
            fullWidth
          />
          <TextField
            id="turma-field"
            value={turma}
            label="Nome da turma"
            variant="outlined"
            required
            error={isSubmitting && errors.turma}
            helperText={isSubmitting && errors.turma ? "Campo obrigatório" : ""}
            onChange={(event) => setTurma(event.target.value)}
            fullWidth
          />
          <TextField
            id="turno-field"
            value={turno}
            label="Turno"
            variant="outlined"
            required
            error={isSubmitting && errors.turno}
            helperText={isSubmitting && errors.turno ? "Campo obrigatório" : ""}
            onChange={(event) => setTurno(event.target.value)}
            fullWidth
          />
          <TextField
            id="ano-field"
            value={ano}
            label="Ano"
            variant="outlined"
            required
            error={isSubmitting && errors.ano}
            helperText={isSubmitting && errors.ano ? "Campo obrigatório" : ""}
            onChange={(event) => setAno(event.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            sx={{ position: "relative", right: 0 }}
            onClick={handleClick}
          >
            Salvar
          </Button>
        </Box>
      )}
    </>
  );
};

export default AddTurma;
