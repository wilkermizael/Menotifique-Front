async function comparaData(data_db) {
    const hoje = new Date().toISOString().split('T')[0]; // Formato: YYYY-MM-DD
    const compara= data_db.results.find((item) => item.data_chamada == hoje) 
    ? "turma_ja_chamada"
    : true;
    return compara

}

export { comparaData };
