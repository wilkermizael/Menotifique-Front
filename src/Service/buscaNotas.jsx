import axios from "axios";


export async function buscaNotas(id) {
  if (id) {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${API_BASE_URL}/logbook/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar notas:", error.message);
      return null;
    }
  }
}
