import axios from "axios";

export async function buscaAlunos(turmaId) {
  const API_BASE_URL = "http://localhost:4000"; // Defina a URL da API
  try {
    const token = import.meta.env.VITE_Token; // Certifique-se de que VITE_Token está definido no .env
    if (!token) {
      throw new Error("Token não encontrado. Verifique suas configurações de ambiente.");
    }
    const response = await axios.get(`${API_BASE_URL}/student/${turmaId}`);
    return response.data; // Retorna o resultado esperado
  } catch (error) {
    console.error("Não foi possível encontrar os alunos:", error.response?.data || error.message);
    throw error; // Relança o erro para tratamento superior
  }
 
}
