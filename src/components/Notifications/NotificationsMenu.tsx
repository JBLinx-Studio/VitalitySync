
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

const NotificationsMenu = () => {
  const { notifications, markNotificationAsRead, getUnreadNotificationsCount } = useHealth();
  const [open, setOpen] = useState(false);
  
  const unreadCount = getUnreadNotificationsCount();
  
  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
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
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2 h-9 w-9"
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
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b">
          <h4 className="font-medium">Notifications</h4>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-gray-500">
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors",
                  notification.read ? "opacity-70" : "bg-blue-50"
                )}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div className="mr-2 text-lg">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className={cn("text-sm", notification.read ? "" : "font-medium")}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {getTimeAgo(notification.date)}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-blue-500 rounded-full mt-1"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full"
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
