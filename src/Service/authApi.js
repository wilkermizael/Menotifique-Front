import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Defina a URL da API

export async function signIn(user, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { user, password });

    // Retorna os dados do usuário, que provavelmente incluem um token
    return response.data;  
  } catch (error) {
    console.error("Erro ao realizar login:", error.response?.data || error.message);
    return null;
  }
}
