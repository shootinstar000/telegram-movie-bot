import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import './HomePage.css';
const API_KEY = '39a082db67753ec41e73b19f02494807';
const BASE_URL = 'https://api.themoviedb.org/3';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

  const fetchMovies = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
      setMovies(response.data.results.slice(0, pageSize)); // Display only 10 movies
      setCurrentPage(page);
      setTotalPages(Math.ceil(response.data.total_results / pageSize)); // Calculate total pages
    } catch (error) {
      console.error('Error fetching movies:', error);
      alert('Failed to fetch movies. Please try again later.');
    }
    setLoading(false);
  }, [pageSize]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

  const handleSearch = async (query, page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
      setMovies(response.data.results.slice(0, pageSize)); // Display only 10 movies
      setCurrentPage(page);
      setTotalPages(Math.ceil(response.data.total_results / pageSize)); // Calculate total pages
    } catch (error) {
      console.error('Error searching movies:', error);
      alert('Failed to search movies. Please try again later.');
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchMovies(page);
    }
  };

  return (
    <div className="home-page">
      <h1>BRATFLIX</h1>
      <SearchBar onSearch={(query) => handleSearch(query, 1)} />
      {loading ? <LoadingSpinner /> : <MovieList movies={movies} />}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default HomePage;
