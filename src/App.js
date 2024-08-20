import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchResults from './pages/SearchResults';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const location = useLocation();

  // Show header for all pages except home
  const showHeader = location.pathname !== '/';

  return (
    <div className="App">
      {showHeader && <Header />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
        <Route path="/search" element={<SearchResults />} />
        {/* Add other routes here */}
      </Routes>
      
      <Footer />  {/* Always show footer */}
    </div>
  );
}

export default App;