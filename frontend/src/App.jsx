import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Layout from "./Layout";
import Register from "./pages/Auth/Register";
import Movies from "./pages/Movies/Movies";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { MovieProvider } from "./context/MovieContext";
import Detail from "./pages/Detail/Detail";
import Profile from "./pages/Profile/profile";
// import Favourite from "./pages/Favourite/Favourite"

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
  

              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<Detail />} />
            </Route>

            <Route path="/profile/:_id" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/favourite" element={<Favourite />} /> */}
          </Routes>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
