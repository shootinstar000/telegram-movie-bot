import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import './MovieDetailPage.css';

const API_KEY = '39a082db67753ec41e73b19f02494807';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        setMovie(response.data);
        
        // Fetch movie videos
        const videoResponse = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
        const trailer = videoResponse.data.results.find(video => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        alert('Failed to fetch movie details. Please try again later.');
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="movie-detail-page">
      {movie && (
        <div className="movie-detail-content">
          <div className="movie-detail-banner">
            <img 
              className="movie-detail-banner-img" 
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
              alt={movie.title}
            />
            <div className="movie-detail-info">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-release-date">{movie.release_date}</p>
              <p className="movie-overview">{movie.overview}</p>
              <p className="movie-rating">Rating: {movie.vote_average}</p>
              <div className="movie-actions">
                <button className="btn-play">Play</button>
                <button className="btn-watchlist">Add to Watchlist</button>
              </div>
            </div>
          </div>

          {/* YouTube Trailer Section */}
          {trailerKey && (
            <div className="trailer-section">
              <h2>Watch the Trailer</h2>
              <div className="trailer-container">
                <iframe 
                  width="100%" 
                  height="315" 
                  src={`https://www.youtube.com/embed/${trailerKey}`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
