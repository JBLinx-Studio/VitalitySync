
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 bg-gradient-to-r from-gray-100 to-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 flex items-center">
              <span className="font-display font-medium">VitalitySync</span>
              <span className="mx-2">•</span>
              <span>© {currentYear} All Rights Reserved</span>
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600">
            <p>Made by JBLinx Studio</p>
            <span className="hidden md:inline">•</span>
            <p>Powered by USDA FoodData Central</p>
          </div>
        </div>
        <div className="mt-4 text-xs text-center text-gray-500">
          <p>Licensed under MIT License. All code and content is proprietary and may not be reproduced without permission.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
