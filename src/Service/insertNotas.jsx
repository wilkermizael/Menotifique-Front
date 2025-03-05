import axios from "axios";
import dayjs from "dayjs";

export default async function insertNotas(turma_id, notas) {
  
  try {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    //Se nota.id_nota existe significa que o usuario está atualizando a nota
    console.log(notas)
    if(notas.id_nota){
       const id = Number(notas.id_nota)
       console.log(notas, "minhas notas")
      const response = await axios.put(
        `${API_BASE_URL}/logbook/update/${id}`,
        { 
          id_class: turma_id,
          id_student: notas.id_aluno,
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
      return response.data
    } else{
      const response = await axios.post(
        `${API_BASE_URL}/logbook`,
        { 
          id_class: turma_id,
          id_student: notas.id_aluno,
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
    }
    
  } catch (error) {
    throw new Error(error.response?.data || error.message);
  }
}
