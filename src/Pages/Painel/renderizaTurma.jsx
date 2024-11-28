import { buscaTurma } from "../../Service/buscaTurma";

export default async function renderizaTurma() {
    try {
        const busca = await buscaTurma(); // Aguarda a busca das turmas

        // Mapeia os dados para criar a estrutura de turmas
        const turmas = busca.map((item) => {
            return {
                turma: `Turma ${item.turma}`, // Formata o nome da turma
                nome: item.nome, // Nome do aluno
                alunos: [] // Lista de alunos inicializada como vazia
            };
        });

        return turmas; // Retorna as turmas formatadas
    } catch (error) {
        console.error("Erro ao renderizar turmas:", error);
        throw error; // Repassa o erro para ser tratado em outro lugar
    }
}
