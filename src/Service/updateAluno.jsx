import axios from 'axios';

export async function updateAluno(props) {
  const { id, nome_aluno, nome_responsavel, telefone_responsavel, qtd_faltas, img_student, turmaId } = props;

  if (!id) throw new Error("ID do aluno não foi fornecido.");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const formData = new FormData();

  formData.append("id_class", String(turmaId));
  formData.append("name_student", nome_aluno);
  formData.append("name_responsible", nome_responsavel);
  formData.append("phone_responsible", telefone_responsavel);
  formData.append("qtd_faults", String(qtd_faltas));

  if (img_student instanceof File) {
    formData.append("img_student", img_student);
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/student/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    throw new Error("Erro ao atualizar aluno.");
  }
}

