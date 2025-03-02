import axios from "axios";

// export async function deleteTurma(id) {
//   if (id) {
//     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
//     try {
//       const response = await axios.delete(`${API_BASE_URL}/class/${id}`);
//       return response.data; // Retorna o resultado esperado
//     } catch (error) {
//      throw new Error(error);
//     }
//   } else {
//     throw new Error("O id da turma não foi passado para que ela seja excluída!");
//   }
// }
export async function deleteTurma(id) {
  console.log("Tentando deletar a turma com ID:", id); // Adicione essa linha

  if (id) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await axios.delete(`${API_BASE_URL}/class/${id}`);
      console.log("Resposta da API:", response);
      return response.data;
    } catch (error) {
      console.error("Erro na requisição:", error.response || error);
      throw new Error(error);
    }
  } else {
    throw new Error("O id da turma não foi passado para que ela seja excluída!");
  }
}
