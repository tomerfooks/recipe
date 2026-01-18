import { useState } from 'react';

export default function RecipeBox({ recipe, onFavorite, isFavorite }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="recipe-card relative overflow-hidden">
      <button
        onClick={() => onFavorite(recipe)}
        className="absolute top-4 right-4 text-3xl hover:scale-125 transition-transform text-yellow-400 drop-shadow-lg z-10"
      >
        {isFavorite ? '★' : '☆'}
      </button>
      
      <h3 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent pr-12">{recipe.name}</h3>
      
      <div className="flex gap-2 mb-6 flex-wrap">
        <span className="badge">
          🍽️ {recipe.type}
        </span>
        <span className="badge">
          🥗 {recipe.diet}
        </span>
        <span className="badge">
          👥 {recipe.personQuantity} people
        </span>
        <span className="badge">
          ⏱️ {recipe.prepDurationInMinutes} min
        </span>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="btn-primary w-full mb-6"
      >
        {isExpanded ? '🔼 Hide Recipe' : '🔽 View Full Recipe'}
      </button>

      {isExpanded && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">📝 Ingredients</h4>
            <ul className="list-none space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-700/60 dark:to-gray-700/40 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                  <span className="font-semibold text-primary-600 dark:text-primary-400">{ing.name}</span>: {ing.quantity} {ing.unit}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">👨‍🍳 Instructions</h4>
            <ol className="list-none space-y-3">
              {recipe.steps.map((step, idx) => (
                <li key={idx} className="bg-gradient-to-r from-white/60 to-white/40 dark:from-gray-700/60 dark:to-gray-700/40 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-primary text-white rounded-full flex items-center justify-center font-bold text-sm">{idx + 1}</span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
