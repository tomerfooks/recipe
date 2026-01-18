# RecipeGenie 🧞‍♂️

A modern web app that generates recipes using AI based on your available ingredients.

## Features

- 🤖 AI-powered recipe generation using Google Gemini API
- 🎨 Neo Brutalism design style
- 🌓 Dark mode support
- ⭐ Save favorite recipes
- 📱 Responsive design
- 🎯 Customizable meal types, diets, portions, and preparation time

## Tech Stack

- React.js (Vite)
- TailwindCSS
- React Router
- Google Gemini AI
- LocalStorage

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd recipe-genie
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter your available ingredients (comma-separated)
2. Select meal type (Breakfast, Lunch, Dinner, etc.)
3. Choose diet preference (Vegan, Keto, etc.)
4. Set number of people and preparation time
5. Click "Generate Recipe"
6. View your generated recipe
7. Save favorites by clicking the star icon

## Project Structure

```
src/
├── components/
│   ├── RecipeBox.jsx
│   └── Select.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── RecipePage.jsx
│   └── Favorites.jsx
├── utils/
│   └── gemini.js
└── App.jsx
```

## License

MIT

