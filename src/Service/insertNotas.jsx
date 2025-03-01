import axios from "axios";
import dayjs from "dayjs";

export default async function insertNotas(turma_id, notas) {
  console.log("Data antes da conversão:", notas.data);
  console.log("Data após conversão:", dayjs(notas.data).toDate());

  
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const response = await axios.post(
      `${API_BASE_URL}/logbook`,
      { 
        id_class: turma_id,
        id_student: notas.id,
        note: notas.descricao,
        date_note: dayjs(notas.data, "DD/MM/YYYY").toDate(),
        demand: notas.tipoDemanda,
        profissional: notas.profissional,
      },
      { 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}
