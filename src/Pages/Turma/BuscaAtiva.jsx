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
  const qtd_alunos = promise.count; // define se existe pelo menos 1 aluno na busca ativa


  const rows = promise.results.map((item) => ({
    id: item.id,
    nome_aluno: item.nome_aluno,
    telefone_aluno: item.telefone_aluno,
    nome_responsavel: item.nome_responsavel,
    telefone_responsavel: item.telefone_responsavel,
    qtd_faltas: item.qtd_faltas,
  }));

  return { rows, qtd_alunos };
}

const BuscaAtiva = ({ turmaId }) => {
  const [rows, setRows] = React.useState([]);
  const [qtdAlunos, setQtdAlunos] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      const { rows: fetchedRows, qtd_alunos } = await getRows(turmaId);
      setRows(fetchedRows);
      setQtdAlunos(qtd_alunos);
    }

    if (turmaId) {
      fetchData();
    }
  }, [turmaId]);

  return (
    <>
      {qtdAlunos > 0 ? (
        rows.map((row) => (
          <Accordion key={row.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{row.nome_aluno}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography><strong>Telefone do Aluno:</strong> {row.telefone_aluno}</Typography>
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
