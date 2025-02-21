import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { buscaAlunos } from "../Service/buscaAlunos";
import { addAluno } from "../Service/addAluno";
import { updateAluno } from "../Service/updateAluno";
import ModalDeleteAluno from "./modalDeleteAluno";

async function getRows() {
  //const promise = await buscaAlunos(turmaId);
  const promise = await buscaAlunos();

  if (!Array.isArray(promise.results) || promise.results.length === 0) {
    console.error("Nenhum dado encontrado ou a estrutura é inesperada");
    return [];
  }
  return promise.results.map((item) => ({
    id: item.id,
    img_student: item.img_student ? `${import.meta.env.API_BASE_URL}${item.img_student}` : null,
    nome_aluno: item.name_student,
    nome_responsavel: item.name_responsible,
    telefone_responsavel: item.phone_responsible,
    qtd_faltas: item.qtd_faults,
  }));
}

const Alunos = ({ turmaId }) => {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false); // Modal de Adicionar/Editar
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false); // Modal de Exclusão
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    id: null,
    img_student: null,
    nome_aluno: "",
    nome_responsavel: "",
    telefone_responsavel: "",
    qtd_faltas: 0,
  });

  React.useEffect(() => {
    async function fetchData() {
      const fetchedRows = await getRows(turmaId);
      setRows(fetchedRows);
    }

    if (turmaId) {
      fetchData();
    }
  }, [turmaId]);

  const handleAddAluno = () => {
    console.log(turmaId)
    setFormData({
      id: null,
      nome_aluno: "",
      img_aluno: "",
      nome_responsavel: "",
      telefone_responsavel: "",
      qtd_faltas: 0,
    });
    setOpen(true);
  };

  const handleEditClick = (row) => {
    setFormData(row);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedRowId(id);
    setOpenDeleteModal(true);
  };

  const handleSaveClick = async () => {
    
    const data = new FormData();
    data.append('name_student', formData.nome_aluno);
    data.append('img_student', formData.img_student); // Adiciona a imagem
    data.append('name_responsible', formData.nome_responsavel);
    data.append('phone_responsible', formData.telefone_responsavel);
    data.append('qtd_faults', formData.qtd_faltas);
    data.append('id_class', turmaId.toString());
    console.log([...data.entries()]); // Diagnóstico
  
    if (formData.id) {
      await updateAluno({
        id: formData.id,
        turmaId,
        nome_aluno: formData.nome_aluno,
        img_student: formData.img_student,
        nome_responsavel: formData.nome_responsavel,
        telefone_responsavel: formData.telefone_responsavel,
      });
      setRows(rows.map((row) => (row.id === formData.id ? formData : row)));
    } else {
      await addAluno({
        turmaId,
        nome_aluno: formData.nome_aluno,
        img_student: formData.img_student,
        nome_responsavel: formData.nome_responsavel,
        telefone_responsavel: formData.telefone_responsavel,
      });
      setRows([...rows, { ...formData, id: new Date().getTime() }]);
    }
    setOpen(false);
  };

  const handleCancelClick = () => {
    setOpen(false);
  };

  const handleDeleteSuccess = () => {
    setRows(rows.filter((row) => row.id !== selectedRowId));
    setOpenDeleteModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddAluno}
        >
          Adicionar Aluno
        </Button>
        {rows.map((row) => (
          <Accordion key={row.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><strong>Aluno(a):</strong> {row.nome_aluno}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <strong>Responsável:</strong> {row.nome_responsavel}
              </Typography>
              <Typography>
                <strong>Telefone:</strong> {row.telefone_responsavel}
              </Typography>
              <Typography>
                <strong>Quantidade de Faltas:</strong> {row.qtd_faltas}
              </Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditClick(row)}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(row.id)}
                >
                  Excluir
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Dialog para Adicionar/Editar Aluno */}
      <Dialog open={open} onClose={handleCancelClick}>
        <DialogTitle>
          {formData.id ? "Editar Aluno" : "Adicionar Novo Aluno"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome do Aluno"
            name="nome_aluno"
            value={formData.nome_aluno}
            onChange={handleInputChange}
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFormData({ ...formData, img_student: file });
              }
            }}
          />
          <TextField
            fullWidth
            label="Nome do Responsável"
            name="nome_responsavel"
            value={formData.nome_responsavel}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Telefone do Responsável"
            name="telefone_responsavel"
            type="number"
            value={formData.telefone_responsavel}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Quantidade de Faltas"
            name="qtd_faltas"
            type="number"
            value={formData.qtd_faltas}
            onChange={handleInputChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            {formData.id ? "Salvar" : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Excluir */}
      <ModalDeleteAluno
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        selectedRowID={selectedRowId}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </>
  );
};

Alunos.propTypes = {
  turmaId: PropTypes.number.isRequired,
};

export default Alunos;
