
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
import React from "react";
import { deleteAluno } from "../Service/deleAluno";
  
  const ModalDeleteAluno = ({ open, setOpen, selectedRowID, onDeleteSuccess }) => {
    // Função de exclusão
    const [close, setClose] = React.useState(false)
    const handleDelete = async () => {
        try {
          // Faça a chamada para excluir a linha no backend
          await deleteAluno(selectedRowID);
    
          // Chama a função de sucesso
          onDeleteSuccess(selectedRowID);
    
          // Fecha o modal
          setOpen(false);
        } catch (error) {
          console.error("Erro ao excluir o aluno:", error);
        }
      };
    const onClose = ()=>{
        setClose(true)
        setOpen(close)
    }

    return (
      <>
        {open ?
      
        <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-delete-title"
        aria-describedby="dialog-delete-description"
      >
        <DialogTitle id="dialog-delete-title">Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography id="dialog-delete-description">
            Você está prestes a excluir permanentemente os dados do aluno. Essa ação não
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
    :""}
    </>
    );
  };
  
  ModalDeleteAluno.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    setOpen: PropTypes.func.isRequired,
    selectedRowID: PropTypes.func.isRequired,
    onDeleteSuccess: PropTypes.func.isRequired,
  };
  
  export default ModalDeleteAluno;
  