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

function App() {


  return (
    <>
      <Router>
      
      <Routes>
        <Route path="/login"  element={
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
    
      </Routes>
    </Router>
    </>
  )
}

export default App
