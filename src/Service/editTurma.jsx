import axios from 'axios';

export async function EditTurma(serie,turma,turno, ano, turmaId) {
    try {
        const token = import.meta.env.VITE_Token; // Certifique-se de que VITE_Token está definido no .env
        if (!token) {
          throw new Error("Token não encontrado. Verifique suas configurações de ambiente.");
        }
    //const token = import.meta.env.VITE_Token;
    const response = await axios({
      method: "PATCH",
      url: `https://baserow.winikii.com/api/database/rows/table/24/${turmaId}/?user_field_names=true`,
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json"
    },
      data: {
        "serie": serie,
        "turma": turma,
        "turno": turno,
        "ano": ano
    }
    });
    return response.data; // Retorna o resultado esperado
  } catch (error) {
    throw new Error(error);
    //console.error("Erro ao realizar cadastro:", error.message);
    //return null; // Retorna um valor seguro em caso de erro
  }
}
