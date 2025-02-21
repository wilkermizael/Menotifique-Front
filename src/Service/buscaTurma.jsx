import axios from "axios";

export async function buscaTurma(id) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  if (id) {
    try {
      //const token = import.meta.env.VITE_Token;
      const response = await axios.get(`${API_BASE_URL}/class/${id}`);
      return response.data; // Retorna o resultado esperado
    } catch (error) {
      console.error("Erro ao realizar login:", error.message);
      return null; // Retorna um valor seguro em caso de erro
    }
  } else {
    try {
      //const token = import.meta.env.VITE_Token;
      const response = await axios(`${API_BASE_URL}/class`);
      return response.data
    } catch (error) {
      console.error("Erro ao realizar login:", error.message);
      return null; // Retorna um valor seguro em caso de erro
    }
  }
}
