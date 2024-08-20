import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import { useLocation } from 'react-router-dom';

const API_KEY = '39a082db67753ec41e73b19f02494807';
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="search-results-page">
      <h1>Search Results for "{query}"</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default SearchResults;
