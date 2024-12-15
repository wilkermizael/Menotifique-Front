import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { EditTurma } from "../../Service/editTurma";

const ModalEdit = ({ turma: initialTurma, turno: initialTurno, ano: initialAno, turmaId, open, onClose, onSave }) => {

  const [turma, setTurma] = useState(initialTurma);
  const [turno, setTurno] = useState(initialTurno);
  const [ano, setAno] = useState(initialAno);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const validationErrors = {};
    if (!turma) validationErrors.turma = true;
    if (!turno) validationErrors.turno = true;
    if (!ano) validationErrors.ano = true;
    return validationErrors;
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Salva as alterações no banco de dados
      await EditTurma( turma, turno, ano, turmaId);

      // Chama o callback `onSave` para atualizar os dados na página principal
      onSave();

      // Fecha o modal
      onClose();
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
      // Você pode exibir uma mensagem de erro ao usuário, se necessário
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="edit-turma-title">
      <DialogTitle id="edit-turma-title">Editar Turma</DialogTitle>
      <DialogContent>
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
          margin="normal"
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
          margin="normal"
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
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalEdit.propTypes = {
  turma: PropTypes.string.isRequired,
  turno: PropTypes.string.isRequired,
  ano: PropTypes.string.isRequired,
  turmaId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalEdit;
