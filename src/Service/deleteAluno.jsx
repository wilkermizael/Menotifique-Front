import axios from "axios";

export async function deleteAluno(id) {
  if (id) {
    try {
      const token = import.meta.env.VITE_Token;
      const response = await axios({
        method: "DELETE",
        url: `https://baserow.winikii.com/api/database/rows/table/25/${id}/`,
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data; // Retorna o resultado esperado
    } catch (error) {
     throw new Error(error);
    }
  } else {
    throw new Error("O id da turma não foi passado para que ela seja excluída!");
  }
}
