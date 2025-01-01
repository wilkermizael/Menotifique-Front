import axios from 'axios';
import dayjs from 'dayjs';

export default  async function insertNotas(turma_id, notas) {
  const { id, descricao, data, tipoDemanda, profissional } = notas;
  const date = dayjs(data).format('YYYY-MM-DD');
  //console.log(date, tipoDemanda)
    try {
        const token = import.meta.env.VITE_Token; // Certifique-se de que VITE_Token está definido no .env
        if (!token) {
          throw new Error("Token não encontrado. Verifique suas configurações de ambiente.");
        }
    //const token = import.meta.env.VITE_Token;
    const response = await axios({
      method: "POST",
      url: "https://baserow.winikii.com/api/database/rows/table/27/?user_field_names=true",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json"
    },
      data: {
        "id_turma": turma_id,
        "id_aluno": id,
        "nota": descricao,
        "data_nota": date,
        "demanda": tipoDemanda,
        "profissional": profissional,
    }
    });
    return response.data; // Retorna o resultado esperado
  } catch (error) {
    throw new Error(error);
    //console.error("Erro ao realizar cadastro:", error.message);
    //return null; // Retorna um valor seguro em caso de erro
  }
}
