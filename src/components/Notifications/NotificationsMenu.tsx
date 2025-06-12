
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useHealth } from '@/contexts/HealthContext';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const NotificationsMenu = () => {
  const { notifications, markNotificationAsRead, getUnreadNotificationsCount } = useHealth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const unreadCount = getUnreadNotificationsCount();
  
  const handleMarkAsRead = (id: string, type: string, navigateTo?: string) => {
    markNotificationAsRead(id);
    
    // If there's a route to navigate to, close popover and navigate
    if (navigateTo) {
      setOpen(false);
      navigate(navigateTo);
    }
  };
  
  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return '🏆';
      case 'goal':
        return '🎯';
      case 'reminder':
        return '⏰';
      case 'addiction':
        return '📊';
      default:
        return '📝';
    }
  };

  const getNavigationPath = (type: string) => {
    switch (type) {
      case 'achievement':
        return '/achievements';
      case 'addiction':
        return '/addiction';
      case 'goal':
        return '/dashboard';
      default:
        return undefined;
    }
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 h-9 w-9 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white" 
              variant="destructive"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 shadow-lg" align="end">
        <div className="p-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
          <h4 className="font-medium flex justify-between items-center">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                {unreadCount} new
              </Badge>
            )}
          </h4>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <div className="text-3xl mb-2">🔔</div>
              <p>No notifications yet</p>
              <p className="text-xs mt-1">Notifications will appear here</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const navigateTo = getNavigationPath(notification.type);
              return (
                <div 
                  key={notification.id}
                  className={cn(
                    "p-3 border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors",
                    notification.read ? "opacity-70" : "bg-blue-50 dark:bg-blue-900/20"
                  )}
                  onClick={() => handleMarkAsRead(notification.id, notification.type, navigateTo)}
                >
                  <div className="flex items-start">
                    <div className="mr-3 text-lg bg-gray-100 dark:bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className={cn("text-sm", notification.read ? "" : "font-medium")}>
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {getTimeAgo(notification.date)}
                        </p>
                        {navigateTo && (
                          <span className="text-xs text-blue-600 dark:text-blue-400">
                            View details
                          </span>
                        )}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
        {notifications.length > 0 && (
          <div className="p-2 border-t bg-gray-50 dark:bg-gray-800">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              onClick={() => {
                notifications
                  .filter(n => !n.read)
                  .forEach(n => markNotificationAsRead(n.id));
              }}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsMenu;
