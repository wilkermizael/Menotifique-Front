import axios from "axios";

export async function deleteAluno(id) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  if (id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/student/${id}`);
      return response.data; // Retorna o resultado esperado
    } catch (error) {
     throw new Error(error);
    }
  } else {
    throw new Error("O id da turma não foi passado para que ela seja excluída!");
  }
}
