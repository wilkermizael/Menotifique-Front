
import { Box } from "@mui/material";

//import { Add, Edit, Delete } from "@mui/icons-material";
//import TypebotBubble from "../../Components/TypebotBubble";
import AddTurma from "./addTurma";


const Painel = () => {
    
  return (
    <Box sx={{ 
        height:'100vh',
        display:'flex',
        flexFlow:'row wrap',
        justifyContent:'space-between',
        alignItems:'flex-start',
        alignContent:'flex-start',
        
        }}>
        <AddTurma
        />
        {/* <TypebotBubble/> */}
        
    </Box>
  );
};

export default Painel;
