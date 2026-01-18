const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="card p-8 text-center space-y-4">
        <img 
          src="/preloader.png" 
          alt="Loading..." 
          className="w-32 h-32 mx-auto spin"
        />
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          ✨ Creating amazing recipes...
        </p>
      </div>
    </div>
  );
}

export default Loader;