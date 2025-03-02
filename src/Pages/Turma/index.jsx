import { useLocation } from "react-router-dom";
//import TypebotBubble from "../../Components/TypebotBubble";
import AppBarTurma from "./AppBarTurma";
import InfoAlunos from "./InfoAlunos";

const Turma = () => {
  const location = useLocation();
  const turmaId = location.state?.turmaId; // Acessa o ID da turma passado
  return (
    <>
      <AppBarTurma
        turmaId={turmaId.toString()}
      />
      <InfoAlunos turmaId={turmaId}/>
      {/*<TypebotBubble />*/}
    </>
  );
};

export default Turma;
