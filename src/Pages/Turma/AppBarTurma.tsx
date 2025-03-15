// import PropTypes from "prop-types";
// import { IconButton, Stack, Typography, Paper, useMediaQuery, useTheme } from "@mui/material";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import ModalEdit from "./EditTurma";
// import ModalDelete from "./DeleteTurma";
// import { buscaTurma } from "../../Service/buscaTurma";
// import { deleteTurma } from "../../Service/deleteTurma";

// const AppBarTurma = ({ turmaId }) => {
//   const [editOpen, setEditOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [turma, setTurma] = useState("");
//   const [turno, setTurno] = useState("");
//   const [ano, setAno] = useState("");

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Verifica se é celular

//   const fetchTurma = async () => {
//     if (turmaId) {
//       try {
//         const resultado = await buscaTurma(turmaId);
//         setTurma(resultado.nameClass);
//         setTurno(resultado.turn);
//         setAno(resultado.year);
//       } catch (error) {
//         console.error("Erro ao buscar turma:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSave = () => {
//     fetchTurma();
//     setEditOpen(false);
//   };

//   const handleDelete = async () => {
//     await deleteTurma(turmaId);
//     fetchTurma();
//     navigate("/painel");
//   };

//   useEffect(() => {
//     fetchTurma();
//   }, [turmaId]);

//   if (loading) {
//     return <Typography variant="h6">Carregando...</Typography>;
//   }

//   return (
//     <>
//       {editOpen && (
//         <ModalEdit
//           turma={turma}
//           turno={turno}
//           open={editOpen}
//           ano={ano}
//           turmaId={turmaId}
//           onSave={handleSave}
//           onClose={() => setEditOpen(false)}
//         />
//       )}

//       {deleteOpen && (
//         <ModalDelete
//           open={deleteOpen}
//           onClose={() => setDeleteOpen(false)}
//           turmaId={turmaId}
//           onDelete={handleDelete}
//         />
//       )}

//       <Paper
//         elevation={2}
//         sx={{
//           bgcolor: "#f8f9fa",
//           borderRadius: "10px",
//           padding: "10px 15px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           flexWrap: "wrap",
//           gap: 1,
//           minHeight: "50px",
//         }}
//       >
//         {/* Botão de voltar */}
//         <IconButton color="primary" onClick={() => navigate("/painel")}>
//           <ArrowBackRoundedIcon sx={{ fontSize: 24 }} />
//         </IconButton>

//         {/* Informações da turma */}
//         <Stack
//           direction={isMobile ? "column" : "row"}
//           spacing={1}
//           sx={{
//             flexGrow: 1,
//             textAlign: isMobile ? "center" : "left",
//             minWidth: 0, // Evita que quebre desnecessariamente
//             overflow: "hidden",
//           }}
//         >
//           <Typography
//             variant="body1"
//             sx={{ fontWeight: 600, color: "primary.main", whiteSpace: "nowrap" }}
//           >
//             {turma}
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             {turno}
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             {ano}
//           </Typography>
//         </Stack>

//         {/* Botões de edição e exclusão */}
//         <Stack direction="row" spacing={1}>
//           <IconButton
//             aria-label="Editar"
//             color="primary"
//             onClick={() => setEditOpen(true)}
//             size="small"
//           >
//             <EditRoundedIcon fontSize="small" />
//           </IconButton>
//           <IconButton
//             aria-label="Excluir"
//             color="error"
//             onClick={() => setDeleteOpen(true)}
//             size="small"
//           >
//             <DeleteRoundedIcon fontSize="small" />
//           </IconButton>
//         </Stack>
//       </Paper>
//     </>
//   );
// };

// AppBarTurma.propTypes = {
//   turmaId: PropTypes.string.isRequired,
// };

// export default AppBarTurma;

import PropTypes from "prop-types";
import { IconButton, Stack, Typography, Paper } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ModalEdit from "./EditTurma";
import ModalDelete from "./DeleteTurma";
import { buscaTurma } from "../../Service/buscaTurma";
import { deleteTurma } from "../../Service/deleteTurma";

const AppBarTurma = ({ turmaId }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    setEditOpen(false);
  };

  const handleDelete = async () => {
    await deleteTurma(turmaId);
    fetchTurma();
    navigate("/painel");
  };

  useEffect(() => {
    fetchTurma();
  }, [turmaId]);

  if (loading) {
    return <Typography variant="h6">Carregando...</Typography>;
  }

  return (
    <>
      {editOpen && (
        <ModalEdit
          turma={turma}
          turno={turno}
          open={editOpen}
          ano={ano}
          turmaId={turmaId}
          onSave={handleSave}
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

      <Paper
        elevation={2}
        sx={{
          bgcolor: "#f8f9fa",
          borderRadius: "10px",
          padding: "10px 15px",
          display: "flex",
          alignItems: "center",
          m:'25px',
          justifyContent: "space-between",
          flexWrap: "nowrap", // Garante que os itens fiquem na mesma linha
          minHeight: "50px",
          gap: 2, // Espaçamento entre os elementos
        }}
      >
        {/* Botão de voltar */}
        <IconButton color="primary" onClick={() => navigate("/painel")} >
          <ArrowBackRoundedIcon sx={{ fontSize: 24 }} />
        </IconButton>

        {/* Informações da turma em linha (NÃO vai quebrar em telas pequenas) */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            flexGrow: 1,
            minWidth: 0,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "primary.main", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {turma}
          </Typography>
          <Typography variant="body1" color="primary.main" sx={{ fontWeight: 600,overflow: "hidden", textOverflow: "ellipsis"}}>
            {turno}
          </Typography>
          <Typography variant="body1" color="primary.main" sx={{ fontWeight: 600,overflow: "hidden", textOverflow: "ellipsis"}}>
            {ano}
          </Typography>
        </Stack>

        {/* Botões de edição e exclusão */}
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="Editar"
            color="primary"
            onClick={() => setEditOpen(true)}
            size="small"
          >
            <EditRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Excluir"
            color="error"
            onClick={() => setDeleteOpen(true)}
            size="small"
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Paper>
    </>
  );
};

AppBarTurma.propTypes = {
  turmaId: PropTypes.string.isRequired,
};

export default AppBarTurma;
