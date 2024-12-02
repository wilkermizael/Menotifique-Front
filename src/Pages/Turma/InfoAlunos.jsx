import PropTypes from "prop-types";
import { Box, Chip, Stack } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


const InfoAlunos = ({turmaId})=>{
    const addAluno = ()=>{
    
            alert(`Id:  ${turmaId}`)
       
        
    }
    return(
        <Box sx={{display:"flex", flexDirection:"column", m:2}}>
            <Stack sx={{display:"flex", flexDirection:"row", justifyContent:"center",}}  spacing={1}>
                <Chip icon={<AddIcon />} label="Adicionar aluno"  color="info" onClick={addAluno}/>
            </Stack>
        </Box>
        
    )
}
InfoAlunos.propTypes = {
    turmaId: PropTypes.string.isRequired,
   
  };
export default InfoAlunos