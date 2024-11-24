import * as React from 'react'
import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import logo from '../Assets/logotipo_donato.jpg';
import personIcon from '../Assets/person_icon.jpg'
import { Link,useNavigate} from "react-router-dom";

const settings = ['Perfil', 'Cadastrar', 'Sair'];

const ResponsiveAppBar = () => {
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (setting) => {
    
    setAnchorElUser(null);
    if (setting === "Sair") {
      localStorage.removeItem("authToken"); // Remove o token do localStorage
      navigate("/login"); // Redireciona para a página de login
    }
  }
  return (
    <>
      <AppBar position="static" sx={{ p: 0.1, backgroundColor:"#56c3f6"  }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/painel">
            <img 
              src={logo}
              alt="Logotipo da escola" 
              style={{ width: 50, height: 50, marginRight: 16 }}

            />
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link to="/painel">EE Donato Werneck de Freitas</Link>
              
            </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="w" src={personIcon} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={()=>handleCloseUserMenu(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
  
}

export default ResponsiveAppBar;

