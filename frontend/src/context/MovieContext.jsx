import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/"; // full backend URL

export const MovieContext = createContext();
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {

    //popular movies
    const fetchMovies = async () => {
      try {
const res = await axios.get(`${API_URL}movies?page=${page}`);
        setMovies(res.data.results || []); //truthy value
        console.log(res.data.results);
      } catch (error) {
        setError("failed to load movies");
        console.log(error.message);
      } finally {
        // finally block always executes, no matter what happens
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  const SearchMovies = async (query) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}search?query=${query}`);
      console.log(res.data);
      setSearchResults(res.data.results || []);
    } catch (error) {
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };



  return (
    <MovieContext.Provider
      value={{
        movies,
        loading,
        error,
        searchResults,
        setSearchResults,
        SearchMovies,
        page,
        setPage,
      
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
export function useMovies() {
  const context = useContext(MovieContext);
  if (!context) throw new Error("userAuth must be used within AuthProvider");
  return context;
}
