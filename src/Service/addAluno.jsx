import axios from "axios";

export async function addAluno(props) {
  const {
    turmaId,
    nome_aluno,
    img_student,
    nome_responsavel,
    telefone_responsavel,
  } = props;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  try {
    const formData = new FormData();
    formData.append("id_class", turmaId);
    formData.append("name_student", nome_aluno);
    formData.append("img_student", img_student);
    formData.append("name_responsible", nome_responsavel);
    formData.append("phone_responsible", telefone_responsavel);
    formData.append("qtd_faults", "0");

    const response = await axios.post(`${API_BASE_URL}/student`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    //const response = await axios.post(`${API_BASE_URL}/student`,formData);
    return response.data;

  } catch (error) {
    console.error("Erro ao realizar cadastro:", error.message);
    throw new Error(error.message);
  }
}
