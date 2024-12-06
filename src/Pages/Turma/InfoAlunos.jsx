import PropTypes from "prop-types";
import { Box} from "@mui/material"
import Tabela from "./tabela";

const InfoAlunos = ({turmaId})=>{


    return(
        <Box sx={{display:"flex", flexDirection:"column", m:3}}>
           
        <Tabela turmaId={turmaId}/>
        </Box>
        
    )
}
InfoAlunos.propTypes = {
    turmaId: PropTypes.string.isRequired,
   
  };
export default InfoAlunos