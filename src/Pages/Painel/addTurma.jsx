import { TextField, Button, Box, Typography, Container } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useState, useEffect } from "react";
import { CadastroTurma } from "../../Service/cadastro_turma";
import renderizaTurma from "../../Pages/Painel/renderizaTurma";
import { useNavigate } from "react-router-dom";

const AddTurma = () => {
  const [isOpen, setOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //const [serie, setSerie] = useState("");
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [ano, setAno] = useState("");
  const [turmas, setTurmas] = useState([]);

  const [errors, setErrors] = useState({
    serie: false,
    turma: false,
    turno: false,
    ano: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurmas = async () => {
      const response = await renderizaTurma();
      setTurmas(response || []);
    };
    fetchTurmas();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const newErrors = {
      //serie: !serie.trim(),
      turma: !turma.trim(),
      turno: !turno.trim(),
      ano: !ano.trim(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      const resposta = await CadastroTurma(turma, turno, ano);
      //setSerie("");
      setTurma("");
      setTurno("");
      setAno("");

      if (resposta) {
        const response = await renderizaTurma();
        setTurmas(response || []);
      }
      setIsSubmitting(false);
      setOpen(!isOpen);
    } else {
      alert("Preencha todos os campos obrigatórios.");
    }
  };

  function escolhe_turma(id) {
    navigate("/turma", { state: { turmaId: id } });
  }

  return (
    <>
      {isOpen ? (
        <Container
          sx={{
            width: "100%",
            height:"100%",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: {xs:"center", sm:"center",md:"flex-start" ,lg:"flex-start"},
            flexGrow:1,
            alignItems:"center",
            alignContent:"center",
            //bgcolor: "#9e1d1d6b",
            
            p: { xs: 4, sm: 6, md: 8, lg: 10 },
          }}
        >
          {turmas.map((item, index) => (
            <Box
              onClick={() => escolhe_turma(item.id)}
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: { xs: "100%", sm: "60%", md: "30%", lg: "18%" },
                height: { xs: "12vh", md: "15vh" },
                opacity: 0.8,
                backgroundColor: "rgba(7, 173, 228, 0.826)",
                color: "white",
                borderRadius: "8px",
                m: 1,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgb(7, 173, 228)",
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
                }}
              >
                {item.turma || "Turma Sem Nome"}
              </Typography>

              <Typography
                variant="h6"
                fontWeight="italic"
                sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
              >
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
              width: { xs: "100%", sm: "60%", md: "30%", lg: "18%" },
              height: { xs: "12vh", md: "15vh" },
              opacity: 0.8,
              backgroundColor: "rgba(85, 85, 85, 0.853)",
              color: "white",
              borderRadius: "8px",
              m: 1,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" } }}
            >
              Adicionar Turma
            </Typography>
          </Box>
        </Container>
      ) : (
        <Box
          component="form"
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            gap: 2,
            width: "100%",
            margin: "0 auto",
            p: { xs: 2, md: 4 },
          }}
          noValidate
          autoComplete="off"
        >
          <ArrowBackRoundedIcon
            color="primary"
            onClick={() => setOpen(!isOpen)}
            sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
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
            sx={{
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
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
