import axios from "axios";

export async function deleteTurma(id) {
  if (id) {
    try {
      const API_BASE_URL = "http://localhost:4000";
      const response = await axios.delete(`${API_BASE_URL}/class/${id}`);
      return response.data; // Retorna o resultado esperado
    } catch (error) {
     throw new Error(error);
    }
  } else {
    throw new Error("O id da turma não foi passado para que ela seja excluída!");
  }
}
