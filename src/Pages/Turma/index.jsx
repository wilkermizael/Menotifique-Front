/* eslint-disable react-hooks/exhaustive-deps */
import { Stack, Typography, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { buscaTurma } from "../../Service/buscaTurma";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModalEdit from "../../Components/ModalEdit";
import ModalDelete from "../../Components/ModalDelete"; // Novo modal para exclusão

const Turma = () => {
  const location = useLocation();
  const turmaId = location.state?.turmaId; // Acessa o ID passado

  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [serie, setSerie] = useState("");
  const [ano, setAno] = useState("");
  const [editOpen, setEditOpen] = useState(false); // Controle do modal de edição
  const [deleteOpen, setDeleteOpen] = useState(false); // Controle do modal de exclusão

  const fetchTurma = async () => {
    if (turmaId) {
      try {
        const resultado = await buscaTurma(turmaId);
        setTurma(resultado.turma);
        setTurno(resultado.turno);
        setSerie(resultado.serie);
        setAno(resultado.ano);
      } catch (error) {
        console.error("Erro ao buscar turma:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Atualiza os dados após salvar
  const handleSave = () => {
    fetchTurma();
    setEditOpen(false); // Fecha o modal após salvar
  };

  useEffect(() => {
    fetchTurma();
  }, [turmaId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      {editOpen && (
        <ModalEdit
          turma={turma}
          turno={turno}
          serie={serie}
          open={editOpen}
          ano={ano}
          turmaId={turmaId}
          onSave={handleSave} // Chama a função handleSave após salvar
          onClose={() => setEditOpen(false)}
        />
      )}

      {deleteOpen && (
        <ModalDelete
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          turmaId={turmaId}
        />
      )}

      {/* Layout Principal */}
      <Stack
        p={2}
        m={2}
        sx={{
          bgcolor: "lightgray",
          borderRadius: "15px",
          display: "flex",
          flexFlow: "row",
          alignItems: "center", // Alinha verticalmente
          justifyContent: "space-between", // Espaçamento entre os itens
        }}
      >
        {/* Dados da turma */}
        <Stack
          direction="row"
          spacing={2} // Espaçamento entre os textos
          sx={{ flexGrow: 1 }} // Garante que os textos ocupem o máximo de espaço
        >
          <Typography>{serie}</Typography>
          <Typography>{turma}</Typography>
          <Typography>{turno}</Typography>
        </Stack>

        {/* Botões */}
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="Editar" onClick={() => setEditOpen(true)}>
            <EditRoundedIcon />
          </IconButton>
          <IconButton
            aria-label="Excluir"
            color="error"
            onClick={() => setDeleteOpen(true)}
          >
            <DeleteRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
};

export default Turma;
