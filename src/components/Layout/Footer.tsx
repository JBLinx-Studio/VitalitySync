
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600 mt-auto">
      <div className="container mx-auto">
        <p>Health Tracker © {new Date().getFullYear()} | All Rights Reserved</p>
        <p className="mt-1">Powered by USDA FoodData Central</p>
      </div>
    </footer>
  );
};

export default Footer;
