import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeBox from '../components/RecipeBox';

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const savedRecipes = localStorage.getItem('currentRecipes');
      if (savedRecipes) {
        setRecipes(JSON.parse(savedRecipes));
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
      localStorage.removeItem('currentRecipes');
      navigate('/');
    }

    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      localStorage.removeItem('favorites');
    }
  }, [navigate]);

  const handleFavorite = (recipe) => {
    const isFavorite = favorites.some(fav => fav.name === recipe.name);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.name !== recipe.name);
    } else {
      newFavorites = [...favorites, recipe];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  if (recipes.length === 0) return null;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              RecipeGenie
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">✨ Here are 3 recipes for you!</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            ← Back Home
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {recipes.map((recipe, idx) => {
            const isFavorite = favorites.some(fav => fav.name === recipe.name);
            return (
              <RecipeBox
                key={idx}
                recipe={recipe}
                onFavorite={handleFavorite}
                isFavorite={isFavorite}
              />
            );
          })}
        </div>

        <button
          onClick={() => navigate('/')}
          className="btn-primary w-full"
        >
          🪄 Generate More Recipes
        </button>
      </div>
    </div>
  );
}
