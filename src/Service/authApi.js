import axios from 'axios';

export async function signIn() {
  try {
    const token = import.meta.env.VITE_Token;
    const response = await axios({
      method: "GET",
      url: "https://baserow.winikii.com/api/database/rows/table/23/?user_field_names=true",
      headers: {
        Authorization: `${token}`
      }
    });
    return response.data.results[0]; // Retorna o resultado esperado
  } catch (error) {
    console.error("Erro ao realizar login:", error.message);
    return null; // Retorna um valor seguro em caso de erro
  }
}
