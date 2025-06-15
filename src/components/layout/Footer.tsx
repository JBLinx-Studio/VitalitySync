
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const isHomePage = location.pathname === '/' || location.pathname === '/Health-and-Fitness-Webapp/';

  // Only render footer on home page
  if (!isHomePage) {
    return null;
  }

  return (
    <footer className="py-8 bg-gradient-to-r from-health-primary/10 via-transparent to-health-secondary/10 backdrop-blur-sm border-t border-white/10 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5 dark:to-black/10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-display font-bold bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent mb-2">VitalitySync</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your complete wellness companion
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-6 md:mb-0">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800 dark:text-gray-100">Features</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-health-primary dark:text-gray-300 dark:hover:text-health-primary transition-colors">Food Tracking</a></li>
                <li><a href="#" className="text-gray-600 hover:text-health-primary dark:text-gray-300 dark:hover:text-health-primary transition-colors">Exercise Plans</a></li>
                <li><a href="#" className="text-gray-600 hover:text-health-primary dark:text-gray-300 dark:hover:text-health-primary transition-colors">Sleep Analysis</a></li>
                <li><a href="#" className="text-gray-600 hover:text-health-primary dark:text-gray-300 dark:hover:text-health-primary transition-colors">Mental Wellness</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800 dark:text-gray-100">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-health-primary dark:text-gray-300 dark:hover:text-health-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-health-primary dark:text-gray-300 dark:hover:text-health-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-health-primary dark:text-gray-300 dark:hover:text-health-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-health-primary dark:text-gray-300 dark:hover:text-health-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-3 col-span-2 md:col-span-1">
              <h4 className="font-medium text-gray-800 dark:text-gray-100">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center hover:bg-health-primary/20 transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center hover:bg-health-primary/20 transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center hover:bg-health-primary/20 transition-colors">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Powered by USDA FoodData Central</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">© {currentYear} VitalitySync. All rights reserved.</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 md:mt-0">Made with ♡ by JBLinx Studio</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
