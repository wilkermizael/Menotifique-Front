import axios from "axios";

export async function CadastroTurma(turma, turno, ano) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  try {
    const token = import.meta.env.VITE_Token; // Certifique-se de que VITE_Token está definido no .env
    if (!token) {
      throw new Error("Token não encontrado. Verifique suas configurações de ambiente.");
    }
    const response = await axios.post(
      `${API_BASE_URL}/class`,
      { nameClass: turma, turn: turno, year: ano }
    );

    return response.data; // Retorna o resultado esperado
  } catch (error) {
    console.error("Erro ao realizar cadastro:", error.response?.data || error.message);
    throw error; // Relança o erro para tratamento superior
  }
}
