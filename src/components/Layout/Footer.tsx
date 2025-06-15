
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 bg-gradient-to-r from-gray-100 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-display">VitalitySync</span>
              <span className="mx-2">•</span>
              <span>© {currentYear} All Rights Reserved</span>
            </p>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <p className="flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" fill="currentColor" /> for a healthier you
            </p>
            <span className="mx-2">•</span>
            <p>Powered by USDA FoodData Central</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
