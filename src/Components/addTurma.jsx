import { TextField, Button, Box, Typography, Container } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useState, useEffect } from "react";
import { CadastroTurma } from "../Service/cadastro_turma";
import renderizaTurma from "../Pages/Painel/renderizaTurma";
import { useNavigate } from "react-router-dom";

const AddTurma = () => {
  const [isOpen, setOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serie, setSerie] = useState("");
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [ano, setAno] = useState("");
  const [turmas, setTurmas] = useState([]); // Novo estado para armazenar as turmas

  const [errors, setErrors] = useState({
    serie: false,
    turma: false,
    turno: false,
    ano: false,
  });
  const navigate = useNavigate()
  // Função para buscar as turmas ao carregar o componente
  useEffect(() => {
    const fetchTurmas = async () => {
      const response = await renderizaTurma();
      setTurmas(response || []); // Armazena as turmas no estado
    };
    fetchTurmas();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

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
      const resposta = await CadastroTurma(serie, turma, turno, ano); // Cadastra nova turma
      setSerie("");
      setTurma("");
      setTurno("");
      setAno("");

      if (resposta) {
        const response = await renderizaTurma(); // Atualiza a lista de turmas
        setTurmas(response || []); // Atualiza o estado com os dados retornados
      }
      setIsSubmitting(false);
      setOpen(!isOpen);
    } else {
      alert("Preencha todos os campos obrigatórios.");
    }
  };
function escolhe_turma(id){
    navigate("/turma", { state: { turmaId: id } });// envia na rota qual turma ele deseja acessar os dados
}
  return (
    <>
      {isOpen ? (
        <Container 
        sx={{
            width:"100%",
            display: "flex",
            flexFlow:"row wrap",
            bgcolor: "rgba #ffffff6b",
            boxShadow: "0px 2px 3px 2px rgba(0, 0, 0, 0.2)",
            p:10
        }}
        >
          {/* Exibe as turmas retornadas */}
          {turmas.map((item, index) => (
            <Box
              onClick={()=> escolhe_turma(item.id)}
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: { xs: "80%", sm: "50%", md: "30%", lg: "18%" },
                height: { xs: "10vh", md: "15vh" },
                opacity: 0.8,
                backgroundColor: "rgba(7, 173, 228, 0.826)",
                color: "white",
                borderRadius: "8px",
                m: 2,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgb(7, 173, 228)",
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold" 
                sx={{
                    position: "absolute", // Define a posição absoluta
                    top: "10px", // Ajuste conforme necessário
                    left: "10px", // Ajuste conforme necessário
                    mb:2
                    }}
              >
                {item.turma || "Turma Sem Nome"}
              </Typography>
                <Typography variant="h6" fontWeight="italic" sx={{mt:4}}>
                    {item.serie}
                </Typography>
                <Typography variant="h6" fontWeight="italic" >
                    {item.turno}
                </Typography>
                <Typography variant="h6" fontWeight="italic" >
                    {item.ano}
                </Typography>
            </Box>
          ))}

          <Box
            onClick={() => setOpen(!isOpen)}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "80%", sm: "50%", md: "30%", lg: "18%" },
              height: { xs: "10vh", md: "15vh" },
              opacity: 0.8,
              backgroundColor: "rgba(85, 85, 85, 0.853)",
              color: "white",
              borderRadius: "8px",
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
        </Container>
      ) : (
        
        <Box
          component="form"
          sx={{
            display: "flex",
            //flexDirection:"column",
            flexFlow: "row wrap",
            alignContent: "center",
            gap: 2,
            width: "100%",
            margin: "0 auto",
          }}
          noValidate
          autoComplete="off"
        >
          <ArrowBackRoundedIcon color="primary"  onClick={() => setOpen(!isOpen)}/>
          <TextField
            id="serie-field"
            value={serie}
            label="Série"
            variant="outlined"
            required
            error={isSubmitting && errors.serie}
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
