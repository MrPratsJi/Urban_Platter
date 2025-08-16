import React from 'react';
import { Pizza, Beef, IndianRupee, BookDown as Bowl, IceCream, Grid } from 'lucide-react';

interface MenuCategoriesProps {
  categories: string[];
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

const categoryIcons: { [key: string]: React.ReactNode } = {
  'All': <Grid className="w-6 h-6" />,
  'Pizza': <Pizza className="w-6 h-6" />,
  'Burgers': <Beef className="w-6 h-6" />,
  'Indian': <IndianRupee className="w-6 h-6" />,
  'Chinese': <Bowl className="w-6 h-6" />,
  'Desserts': <IceCream className="w-6 h-6" />
};

const categoryColors: { [key: string]: string } = {
  'All': 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
  'Pizza': 'from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600',
  'Burgers': 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
  'Indian': 'from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600',
  'Chinese': 'from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600',
  'Desserts': 'from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
};

export const MenuCategories: React.FC<MenuCategoriesProps> = ({
  categories,
  activeCategory,
  onCategorySelect,
}) => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Browse Our Menu
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`
                relative p-6 rounded-2xl text-white font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg
                ${activeCategory === category 
                  ? `bg-gradient-to-br ${categoryColors[category]} ring-4 ring-white ring-opacity-60 scale-105` 
                  : `bg-gradient-to-br ${categoryColors[category]} opacity-80 hover:opacity-100`
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                {categoryIcons[category]}
                <span className="text-sm">{category}</span>
              </div>
              {activeCategory === category && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};