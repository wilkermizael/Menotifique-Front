import axios from "axios";
import { comparaData } from "../Utils/comparaData";
import { evolution } from "./evolution";

const marcaPresenca = async (lista) => {
  const dataDb = await verificaChamada(lista);
  const chamadaJaRealizada = await comparaData(dataDb);
  if (chamadaJaRealizada == "turma_ja_chamada") {
    return "turma_ja_chamada";
  }

  try {
    // Função para formatar a data como YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Faz as requisições POST para cada aluno na lista
    const token = import.meta.env.VITE_Token;
    if (!token) {
      throw new Error("Token não encontrado. Verifique suas configurações de ambiente.");
    }

    const promises = lista.map(async (aluno) => {
      const listaChamada = {
        id_aluno: aluno.id,
        id_turma: aluno.id_turma,
        presente: aluno.presente,
        envio_notificacao: "false",
        data_chamada: formatDate(new Date()),
      };

      const response = await axios.post(
        "https://baserow.winikii.com/api/database/rows/table/26/?user_field_names=true",
        listaChamada,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Envia dados para o webhook n8n
      await evolution(response.data);
      return true; // Sucesso para este aluno
    });

    // Aguarda todas as requisições
    const resultados = await Promise.allSettled(promises);

    // Verifica falhas e sucessos
    const falhas = resultados.filter((res) => res.status === "rejected");
    if (falhas.length > 0) {
      console.warn("Algumas requisições falharam:", falhas);
    }

    return resultados.every((res) => res.status === "fulfilled") ? true : false;
  } catch (error) {
    console.error("Erro ao atualizar presença:", error.message);
    throw error; // Relança o erro para ser tratado externamente
  }
};

const  verificaChamada = async (lista) => {
  try {
    const token = import.meta.env.VITE_Token;
    if (!token) {
      throw new Error("Token não encontrado. Verifique suas configurações de ambiente.");
    }
    
    const idTurma = lista[0]?.id_turma;
    if (!idTurma) {
      throw new Error("ID da turma não encontrado na lista.");
    }

    const response = await axios.get();

    const results = response.data;
    if (!results || results.length === 0) {
      return null; // Sem dados
    }

    return results;
  } catch (error) {
    console.error("Erro ao verificar chamada:", error.message);
    return null;
  }
};

export default marcaPresenca;
