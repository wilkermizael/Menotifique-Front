import * as React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getBuscaAtiva } from '../../Service/getBuscaAtiva';

async function getRows(turmaId) {
  const promise = await getBuscaAtiva(turmaId);

  // Verifica se promise.results é um array, senão, retorna um array vazio
  const results = Array.isArray(promise.results) ? promise.results : [];

  const rows = results.map((item) => ({
    id: item.id,
    nome_aluno: item.name_student,
    nome_responsavel: item.name_responsible,
    telefone_responsavel: item.phone_responsible,
    qtd_faltas: item.qtd_faults,
  }));

  return rows; // Garante que retorna um array
}

const BuscaAtiva = ({ turmaId }) => {
  const [rows, setRows] = React.useState([]);
  const [qtdAlunosComMuitasFaltas, setQtdAlunosComMuitasFaltas] = React.useState(0);

 

  React.useEffect(() => {
    async function fetchData() {
      const fetchedRows = await getRows(turmaId);
      
      // Agora fetchedRows sempre será um array, então podemos filtrar
      const alunosComMuitasFaltas = fetchedRows.filter((aluno) => aluno.qtd_faltas > 9);
  
      setRows(alunosComMuitasFaltas);
      setQtdAlunosComMuitasFaltas(alunosComMuitasFaltas.length);
    }
  
    if (turmaId) {
      fetchData();
    }
  }, [turmaId]);

  return (
    <>
      {qtdAlunosComMuitasFaltas  > 0 ? (
        rows.map((row) => (
          <Accordion key={row.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{row.nome_aluno}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography><strong>Nome do Responsável:</strong> {row.nome_responsavel}</Typography>
              <Typography><strong>Telefone do Responsável:</strong> {row.telefone_responsavel}</Typography>
              <Typography><strong>Quantidade de Faltas:</strong> {row.qtd_faltas}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography variant="h6" align="center" color="textSecondary">
            📚 Não encontramos nenhum aluno na busca ativa para esta turma. 😊
        </Typography>

      )}
    </>
  );
};

BuscaAtiva.propTypes = {
  turmaId: PropTypes.number.isRequired,
};

export default BuscaAtiva;
