
import { Box } from "@mui/material";

//import { Add, Edit, Delete } from "@mui/icons-material";
import TypebotBubble from "../../Components/TypebotBubble";
import AddTurma from "./addTurma";


const Painel = () => {
    
  return (
    <Box sx={{ 
        //width:"90%",
        height:'100vh',
        //m:10,
        //p:10,
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
