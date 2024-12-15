import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Navigate
} from 'react-router-dom'
import PublicRoute from './Contexts/PublicRoute'
import PrivateRoute from './Contexts/PrivateRoute'
import Login from './Pages/Login'
import Painel from './Pages/Painel'
import NavBar from './Components/Navbar'
import Turma from './Pages/Turma'

function App() {


  return (
    <>
      <Router>
      
      <Routes>
        <Route path="/"  element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }/>
        <Route path="/painel" element={
            <PrivateRoute>
              <NavBar/>
              <Painel />
            </PrivateRoute>
          }/>
          <Route path="/turma" element={
            <PrivateRoute>
              <NavBar/>
              <Turma/>
            </PrivateRoute>
          }/>
    
      </Routes>
    </Router>
    </>
  )
}

export default App
