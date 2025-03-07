import { Box, Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import Chamada from "../../Components/Chamada";
import BuscaAtiva from "./BuscaAtiva"
import DiarioDeBordo from "./DiarioDeBordo";
import Alunos from "../../Components/Alunos";
//import React from "react";
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const MyBottomNavigation = ({value, setValue, turmaId})=>{
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ 
        width: '100%',

      }}>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          display:"flex",
          justifyContent:"center",
          scrollBehavior: "smooth",
        }}
          >
          <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTab-root": {
              minWidth: { xs: "33%", sm: "25%" }, // Responsivo para telas menores
            },
          }}
          >
            <Tab label="Chamada" {...a11yProps(0)} />
            <Tab label="Alunos" {...a11yProps(1)} />
            <Tab label="Busca Ativa" {...a11yProps(2)}/>
            <Tab label="Diário de bordo" {...a11yProps(3)}/>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Chamada turmaId={turmaId}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Alunos turmaId={turmaId}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <BuscaAtiva turmaId={turmaId}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <DiarioDeBordo turmaId={turmaId}/>
        </CustomTabPanel>
      </Box>
    );
}

MyBottomNavigation.propTypes = {
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
    turmaId: PropTypes.number.isRequired,
   
  };
export default MyBottomNavigation