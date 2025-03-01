import axios from "axios";

const statusPresenca = async (lista) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const token = import.meta.env.VITE_Token;
    if (!token) {
      throw new Error("Token não encontrado. Verifique suas configurações de ambiente.");
    }
    if (lista.length === 0) throw new Error("Lista Vazia");

    const id_class = lista[0]?.id_class;
    if (!id_class) throw new Error("Id turma não encontrado");

    const promises = lista.map(async (aluno) => {
      const listaChamada = [{
        id_student: aluno.id,
        id_class: aluno.id_class,
        name_student: aluno.name_student,
        name_responsible: aluno.name_responsible,
        phone_responsible: aluno.phone_responsible,
        is_present: aluno.is_present,
        img_student: aluno.img_student,
        qtd_faults: aluno.qtd_faults,
        send_notification: false,
      }];
      return axios.post(`${API_BASE_URL}/attendance`, listaChamada, {
        headers: {
          "Content-Type": "application/json"
        },
      });
    });

    const resultados = await Promise.allSettled(promises);

    // // Verifica falhas e sucessos
    // const falhas = resultados.filter((res) => res.status === "rejected");
    // if (falhas.length > 0) {
    //   console.warn("Algumas requisições falharam:", falhas);
    // }

    // Retorna os resultados das requisições
    return resultados[0].value.data.results;
  } catch (error) {
    console.error("Erro ao atualizar presença:", error.message);
    throw error; // Relança o erro para ser tratado externamente
  }
};

export default statusPresenca;
