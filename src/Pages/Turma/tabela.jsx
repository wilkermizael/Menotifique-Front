import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {randomId} from '@mui/x-data-grid-generator';
  
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { buscaAlunos } from '../../Service/buscaAlunos';
import { addAluno } from '../../Service/addAluno';
import { updateAluno } from '../../Service/updateAluno';
import ModalDeleteAluno from '../../Components/modalDeleteAluno';



async function getRows(turmaId) {
    const promise = await buscaAlunos(turmaId);
  
    // Verifica se `promise.results` é um array e tem elementos
    if (!Array.isArray(promise.results) || promise.results.length === 0) {
      console.error('Nenhum dado encontrado ou a estrutura é inesperada');
      return [];
    }
  
    // Mapear todos os elementos do array `promise.results`
    const initialRows = promise.results.map((item) => ({
      id: item.id,  // id que vem do db
      nome_aluno: item.nome_aluno,
      telefone_aluno: item.telefone_aluno,
      nome_responsavel: item.nome_responsavel,
      telefone_responsavel: item.telefone_responsavel,
      qtd_faltas: item.qtd_faltas,
    }));

    return initialRows;
  }

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId(); // id da nova linha
    const newRow = {
      id,
      nome_aluno: '',
      telefone_aluno: '',
      nome_responsavel: '',
      telefone_responsavel: '',
      qtd_faltas: 0,
      isNew: true, // Marca a linha como nova
    };
    setRows((oldRows) => [...oldRows, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'nome_aluno' },
    }));
  };
  

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Aluno
      </Button>
    </GridToolbarContainer>
  );
}

const Tabela = (props) => {
  const { turmaId } = props;
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [open, setOpen] = React.useState(false)
  const [selectedRowId, setSelectedRowId] = React.useState(null);


  // Carregar os dados assim que a turmaId for recebida ou modificada
 React.useEffect(() => {
    async function fetchData() {
        const fetchedRows = await getRows(turmaId);
        setRows(fetchedRows);
      }

    if (turmaId) {
      fetchData();
    }
  }, [turmaId]);

  const handleDeleteSuccess = (id) => {
    // Filtra a linha excluída do estado
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setSelectedRowId(id);
    setOpen(true)
    //setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    // Verifica se a linha é nova
    if (newRow.isNew) {
      addAluno({...newRow, turmaId});//add os dados do novo aluno no db
      // Adiciona a nova linha se ela não existir no estado
      setRows((oldRows) => {
        if (!oldRows.some((row) => row.id === newRow.id)) {
          return [...oldRows, { ...newRow, isNew: false }];
        }
        return oldRows;
      });
    } else {
      updateAluno({...newRow, turmaId})
      // Atualiza uma linha existente
      setRows((oldRows) =>
        oldRows.map((row) => (row.id === newRow.id ? { ...newRow, isNew: false } : row))
      );
    }
    return { ...newRow, isNew: false };
  };
  
  

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'nome_aluno', headerName: 'Nome do Aluno', flex: 1,align: 'center',
        headerAlign: 'center', editable: true },
    {
      field: 'telefone_aluno',
      headerName: 'Telefone do Aluno',
      type: 'number',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'nome_responsavel',
      headerName: 'Nome do Responsável',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'telefone_responsavel',
      headerName: 'Telefone do Responsável',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      type: 'number',
    },
    {
      field: 'qtd_faltas',
      headerName: 'Quantidade de faltas',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      editable: false,
      type: 'number',
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      renderCell: (params) => {
        const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return (
            <Box>
              <Button
                size="small"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveClick(params.id)}
              />
              <Button
                size="small"
                color="secondary"
                startIcon={<CancelIcon />}
                onClick={handleCancelClick(params.id)}
              />
            </Box>
          );
        }

        return (
          <Box>
            <Button
              size="small"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEditClick(params.id)}
            />
            <Button
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick(params.id)}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {!open ? (
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{display:'flex', justifyContent:'space-between', alignContent: 'space-arround'}}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{ toolbar: EditToolbar }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
      ) : (
        <>
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{ toolbar: EditToolbar }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
        <ModalDeleteAluno open={open} setOpen={setOpen} selectedRowID={selectedRowId} onDeleteSuccess={handleDeleteSuccess}/>
        </>
      )}
    </>
  );
  
};

Tabela.propTypes = {
  turmaId: PropTypes.string.isRequired, // Ajuste o tipo para refletir a natureza de turmaId
  selectedRowid: PropTypes.func.isRequired,
};
EditToolbar.propTypes = {
    setRows: PropTypes.func.isRequired,
    setRowModesModel: PropTypes.func.isRequired,
  };
export default Tabela;