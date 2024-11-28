
import { Box } from "@mui/material";
import AddTurma from "../../Components/addTurma";
//import { Add, Edit, Delete } from "@mui/icons-material";
import TypebotBubble from "../../Components/TypebotBubble";


const Painel = () => {
    
  return (
    <Box sx={{ 
        height:'100vh',
        border: '5px dashed',
        m:10,
        p:10,
        display:'flex',
        flexFlow:'row wrap',
        justifyContent:'spacte-between',
        alignItems:'flex-start',
        alignContent:'flex-start'


        }}>
        <AddTurma/>
        <TypebotBubble/>
        
    </Box>
  );
};

export default Painel;
