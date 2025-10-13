
import {BrowserRouter as Router,Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Layout from './Layout'
import Register from './pages/Auth/Register'
import About from './pages/About/About'
import Movies from './pages/Movies/Movies'
import { AuthProvider,useAuth } from './context/AuthContext'
import Dashboard from './components/Dashboard'
import { MovieProvider } from './context/MovieContext'


function PrivateRoute({children}){
  const {isAuthenticated,loading}= useAuth()
  if (loading) return <div>Loading...</div>; return isAuthenticated ? children : <Navigate to="/login" replace/>
}


function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        
    <Router>

      <Routes>

        <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
          
        }/>
      <Route path='/movies' element={<Movies/>}/>
        </Route>


      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
          </MovieProvider>
    </AuthProvider>
  )
}

export default App
