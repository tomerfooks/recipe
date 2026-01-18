import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import Favorites from './pages/Favorites';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      if (saved) {
        setDarkMode(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading dark mode setting:', error);
      localStorage.removeItem('darkMode');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <nav className="card m-4 p-4 backdrop-blur-2xl sticky top-4 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex gap-6">
              <Link to="/" className="font-semibold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                🏠 Home
              </Link>
              <Link to="/favorites" className="font-semibold text-gray-700 dark:text-gray-200 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
                ⭐ Favorites
              </Link>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="select-chip hover:scale-105 transition-transform"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

