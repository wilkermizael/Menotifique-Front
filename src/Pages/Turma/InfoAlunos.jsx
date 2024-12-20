import PropTypes from "prop-types";
import { Box} from "@mui/material"
import MyBottomNavigation from "../../Components/BottomNavigation";
import React from "react";
//import Tabela from "./tabela";
//import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

const InfoAlunos = ({turmaId})=>{
    const [value, setValue] = React.useState(0);

    return(
        <Box sx={{display:"flex", flexDirection:"column"}}>
        <MyBottomNavigation value={value} setValue={setValue} turmaId={turmaId}/>
        </Box>
        
    )
}
InfoAlunos.propTypes = {
    turmaId: PropTypes.string.isRequired,
   
  };
export default InfoAlunos