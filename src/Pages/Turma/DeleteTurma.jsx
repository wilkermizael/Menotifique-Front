
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";

const ModalDelete = ({ open, onClose, turmaId, onDelete }) => {
  // Função de exclusão
  const handleDelete = () => {
    onDelete(turmaId);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-delete-title"
      aria-describedby="dialog-delete-description"
    >
      <DialogTitle id="dialog-delete-title">Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <Typography id="dialog-delete-description">
          Você está prestes a excluir permanentemente a turma. Essa ação não
          poderá ser desfeita. Deseja continuar?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleDelete} color="error">
            Excluir
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

ModalDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  turmaId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ModalDelete;
