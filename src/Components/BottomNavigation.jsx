import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import Chamada from "./Chamada";
import NewTabela from "./newTable";
import BuscaAtiva from "../Pages/Turma/BuscaAtiva";
import DiarioDeBordo from "../Pages/Turma/DiarioDeBordo";

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
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
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

const MyBottomNavigation = ({ value, setValue, turmaId }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor:"red",
         
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          //variant="fullWidth" // Garante que as abas se ajustem automaticamente
          variant="scrollable" // Permite que as abas sejam roláveis
          scrollButtons="auto"
        >
          <Tab label="Chamada" {...a11yProps(0)} />
          <Tab label="Alunos" {...a11yProps(1)} />
          <Tab label="Busca Ativa" {...a11yProps(2)} />
          <Tab label="Diário de Bordo" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Chamada turmaId={turmaId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <NewTabela turmaId={turmaId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BuscaAtiva turmaId={turmaId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <DiarioDeBordo turmaId={turmaId} />
      </CustomTabPanel>
    </Box>
  );
};

MyBottomNavigation.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  turmaId: PropTypes.number.isRequired,
};

export default MyBottomNavigation;
