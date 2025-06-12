
import React from 'react';
import {
  Moon,
  Sun,
  Settings,
  LogOut,
  User,
  Bell,
  Palette,
  Languages
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface OptionsMenuProps {
  userLoggedIn?: boolean;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ userLoggedIn = false }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative rounded-full bg-gradient-to-r from-health-primary/10 to-health-secondary/10 border-health-primary/20 hover:border-health-primary/40 hover:bg-gradient-to-r hover:from-health-primary/20 hover:to-health-secondary/20 transition-all"
        >
          <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-health-primary/20">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={toggleTheme}
            className="cursor-pointer hover:bg-health-primary/10"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="mr-2 h-4 w-4 text-amber-500" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="mr-2 h-4 w-4 text-indigo-400" />
                <span>Dark Mode</span>
              </>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => navigate('/settings')}
            className="cursor-pointer hover:bg-health-primary/10"
          >
            <Palette className="mr-2 h-4 w-4 text-health-primary" />
            <span>Appearance</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer hover:bg-health-primary/10">
            <Languages className="mr-2 h-4 w-4 text-health-secondary" />
            <span>Language</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer hover:bg-health-primary/10">
            <Bell className="mr-2 h-4 w-4 text-amber-500" />
            <span>Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        {userLoggedIn && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => navigate('/profile')}
                className="cursor-pointer hover:bg-health-primary/10"
              >
                <User className="mr-2 h-4 w-4 text-blue-500" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-500/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
