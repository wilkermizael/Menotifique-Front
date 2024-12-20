//Funcao que separa os alunos presentes dos faltosos
const separaPresenca = (alunos, presenca)=>{
    const presentes = [];

  // Itera sobre os alunos e verifica o status de presença
  alunos.forEach(aluno => {
    if (presenca[aluno.id]) {
      presentes.push({...aluno, presente:"true"});
    } else {
      presentes.push({...aluno, presente:"false"});
    }
  });

  return { presentes };
}

export default separaPresenca