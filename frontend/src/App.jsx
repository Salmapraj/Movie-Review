
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Layout from './Layout'

function App() {

  return (
    <Router>

      <Routes>

        <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
        </Route>


      <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
