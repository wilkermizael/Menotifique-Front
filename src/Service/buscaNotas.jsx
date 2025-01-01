import axios from "axios";

export async function buscaNotas(id) {
    
  if (id) {
    try {
      const token = import.meta.env.VITE_Token;
      const response = await axios({
        method: "GET",
        url: `https://baserow.winikii.com/api/database/rows/table/27/?user_field_names=true&filters=%7B%22filter_type%22%3A%22AND%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22equal%22%2C%22field%22%3A%22id_aluno%22%2C%22value%22%3A%22${id}%22%7D%5D%2C%22groups%22%3A%5B%5D%7D`,
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data; // Retorna o resultado esperado
    } catch (error) {
      console.error("Erro ao realizar login:", error.message);
      return null; // Retorna um valor seguro em caso de erro
    }
  }
}

