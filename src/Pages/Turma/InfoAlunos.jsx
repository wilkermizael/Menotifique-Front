import PropTypes from "prop-types";
import { Box} from "@mui/material"
import MyBottomNavigation from "./BottomNavigation";
import React from "react";

const InfoAlunos = ({turmaId})=>{
    const [value, setValue] = React.useState(0);

    return(
        <Box sx={{display:"flex", flexDirection:"column"}}>
        <MyBottomNavigation value={value} setValue={setValue} turmaId={turmaId}/>
        </Box>
        
    )
}
InfoAlunos.propTypes = {
    turmaId: PropTypes.number.isRequired,
   
  };
export default InfoAlunos