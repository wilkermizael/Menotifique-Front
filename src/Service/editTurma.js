import axios from 'axios';

export async function editTurmaById(turma, turno, ano, turmaId) {
  const API_BASE_URL = "http://localhost:4000";
  try {
    const response = await axios.put(`${API_BASE_URL}/class/${turmaId}`, {
      nameClass: turma,
      turn: turno,
      year: ano
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}