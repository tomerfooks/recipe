import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeBox from '../components/RecipeBox';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      localStorage.removeItem('favorites');
    }
  }, []);

  const handleFavorite = (recipe) => {
    const newFavorites = favorites.filter(fav => fav.name !== recipe.name);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 py-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            ⭐ Favorites
          </h1>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            ← Back Home
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="card p-16 text-center space-y-6">
            <div className="text-6xl">📚</div>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">No favorite recipes yet!</p>
            <p className="text-gray-600 dark:text-gray-400">Generate some recipes and save your favorites here.</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary mt-6 inline-block"
            >
              🪄 Generate Recipe
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {favorites.map((recipe, idx) => (
              <RecipeBox
                key={idx}
                recipe={recipe}
                onFavorite={handleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
