import PropTypes from "prop-types";
import { IconButton, Stack, Typography } from "@mui/material"
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ModalEdit from "./EditTurma";
import ModalDelete from "./DeleteTurma";
import { buscaTurma } from "../../Service/buscaTurma";
import { deleteTurma } from "../../Service/deleteTurma";


const AppBarTurma = ({ turmaId})=>{
  const [editOpen, setEditOpen] = useState(false); // Controle do modal de edição
  const [deleteOpen, setDeleteOpen] = useState(false); // Controle do modal de exclusão  
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [turma, setTurma] = useState("");
  const [turno, setTurno] = useState("");
  const [ano, setAno] = useState("");
  const fetchTurma = async () => {
    if (turmaId) {
      try {
        const resultado = await buscaTurma(turmaId);
        setTurma(resultado.nameClass);
        setTurno(resultado.turn);
        setAno(resultado.year);
      } catch (error) {
        console.error("Erro ao buscar turma:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = () => {
    fetchTurma();
    setEditOpen(false); // Fecha o modal após salvar
  };

  const handleDelete = async ()=> {
    await deleteTurma(turmaId)
    fetchTurma(); //atualiza dados depois de deletar turma
    navigate("/painel");
  };
  
  useEffect(() => {
    fetchTurma();
  }, [turmaId]);

  if (loading) {
    return <div>Carregando...</div>;
  }
    return(
        <>
        {editOpen && (
        <ModalEdit
          turma={turma}
          turno={turno}
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
          onDelete={handleDelete}
        />
      )}
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
        <IconButton color="primary" onClick={()=>navigate("/painel")}>
            <ArrowBackRoundedIcon sx={{ fontSize: 30 }} />
        </IconButton>
        <Stack
          direction="row"
          spacing={2} // Espaçamento entre os textos
          sx={{ flexGrow: 1, ml:2 }} // Garante que os textos ocupem o máximo de espaço
        >
          <Typography>{turma}</Typography>
          <Typography>{turno}</Typography>
          <Typography>{ano}</Typography>
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
    )
}
AppBarTurma.propTypes = {
    turmaId: PropTypes.string.isRequired,
   
  };
export default AppBarTurma