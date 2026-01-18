import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from '../components/Select';
import Loader from '../components/Loader';
import { generateRecipe } from '../utils/gemini';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Brunch', 'Soup'];
const DIETS = ['Vegan', 'Vegetarian', 'Keto', 'Paleo', 'Carnivore', 'Dairy-free', 'Gluten-free'];

export default function HomePage() {

  const [ingredients, setIngredients] = useState('');
  const [mealType, setMealType] = useState([]);
  const [diet, setDiet] = useState([]);
  const [personQuantity, setPersonQuantity] = useState(2);
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      alert('Please enter some ingredients!');
      return;
    }

    setLoading(true);
    try {
      const recipes = await generateRecipe({
        ingredients: ingredients.split(',').map(i => i.trim()),
        mealType,
        diet,
        personQuantity,
        duration
      });

      if (!recipes || recipes.length === 0) {
        alert('❌ Cannot generate recipes with those ingredients. Please provide valid, reasonable ingredients for cooking!');
        setLoading(false);
        return;
      }

      localStorage.setItem('currentRecipes', JSON.stringify(recipes));
      navigate('/recipe');
    } catch (error) {
      console.error('Error generating recipe:', error);
      alert(error.message || 'Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {loading && <Loader />}
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center space-y-3">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent drop-shadow-lg">
            RecipeGenie
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">✨ Create magical recipes with AI</p>
        </div>

        <div className="card p-8 md:p-10 space-y-8">
          <div>
            <label className="text-lg font-semibold block mb-3 text-gray-700 dark:text-gray-200">
              🥘 What ingredients do you have?
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., tomato, eggs, cheese, bread..."
              className="input-modern min-h-[120px] resize-none"
            />
          </div>

            <Select
                label="Meal Type (Optional)"
                options={MEAL_TYPES}
                value={mealType}
                onChange={setMealType}
                multiple={true}
            />

            <Select
                label="Diet (Optional)"
                options={DIETS}
                value={diet}
                onChange={setDiet}
                multiple={true}
            />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-semibold block mb-3 text-gray-700 dark:text-gray-200">
                👥 Number of People
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={personQuantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 1 && value <= 100) {
                    setPersonQuantity(value);
                  }
                }}
                className="input-modern"
              />
            </div>

            <div>
              <label className="text-lg font-semibold block mb-3 text-gray-700 dark:text-gray-200">
                ⏱️ Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="2000"
                value={duration}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 1 && value <= 2000) {
                    setDuration(value);
                  }
                }}
                className="input-modern"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary w-full text-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '✨ Creating your recipe...' : '🪄 Generate Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
}
