export default function Select({ label, options, value, onChange, multiple = false }) {
  const handleClick = (option) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(v => v !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-lg font-semibold block text-gray-700 dark:text-gray-200">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = multiple 
            ? value.includes(option) 
            : value === option;
          
          return (
            <button
              key={option}
              onClick={() => handleClick(option)}
              className={`select-chip ${
                isSelected 
                  ? 'select-chip-active' 
                  : ''
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
