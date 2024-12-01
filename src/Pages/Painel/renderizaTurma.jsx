import { buscaTurma } from "../../Service/buscaTurma";

export default async function renderizaTurma() {
    try {
        const busca = await buscaTurma(); // Aguarda a busca das turmas

        // Mapeia os dados para criar a estrutura de turmas
        const turmas = busca.map((item) => {
            return {
                id: item.id,
                serie: item.serie,
                turma: item.turma, 
                turno: item.turno, 
                ano: item.ano
            };
        });

        return turmas; 
    } catch (error) {
        console.error("Erro ao renderizar turmas:", error);
        throw error; 
    }
}
