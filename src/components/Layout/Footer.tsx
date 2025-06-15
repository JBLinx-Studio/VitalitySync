
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 bg-muted/50 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground flex items-center">
              <span className="font-semibold">VitalitySync</span>
              <span className="mx-2">•</span>
              <span>© {currentYear} All Rights Reserved</span>
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
            <p>Made by JBLinx Studio</p>
            <span className="hidden md:inline">•</span>
            <p>Powered by USDA FoodData Central</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
