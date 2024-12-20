async function comparaData(data_db) {
    const hoje = new Date().toISOString().split('T')[0]; // Formato: YYYY-MM-DD
    if (hoje === data_db) {
        return "turma_ja_chamada";
    } else {
        return "";
    }
}

export { comparaData };
