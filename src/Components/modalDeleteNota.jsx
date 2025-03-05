
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
  
  const ModalDeleteNota = ({ open, onClose, onDelete, rows }) => {
    // Função de exclusão
    // Garante que há pelo menos uma linha e um board válido antes de acessar o ID
    const idNota = rows?.[0]?.board?.[0]?.id_nota ?? null;
    const handleDelete = async() => {
      onDelete(idNota);
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
            Você está prestes a excluir permanentemente a nota. Essa ação não
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
  
  ModalDeleteNota.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  
  export default ModalDeleteNota;
  