
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Layout from './Layout'
import Register from './pages/Auth/Register'
import About from './pages/About/About'
import Movies from './pages/Movies/Movies'

function App() {

  return (
    <Router>

      <Routes>

        <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      
      <Route path='/movies' element={<Movies/>}/>
        </Route>


      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App
