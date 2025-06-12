
import React, { useState } from "react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHealth } from "@/contexts/HealthContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const NotificationsMenu: React.FC = () => {
  const { notifications, markNotificationAsRead, getUnreadNotificationsCount } = useHealth();
  const [open, setOpen] = useState(false);
  const unreadCount = getUnreadNotificationsCount();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return "🏆";
      case "addiction":
        return "📊";
      case "exercise":
        return "🏃";
      case "food":
        return "🍎";
      case "goal":
        return "🎯";
      case "sleep":
        return "💤";
      case "water":
        return "💧";
      default:
        return "📌";
    }
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };

  const markAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] p-4 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors",
                    notification.read ? "" : "bg-muted/30"
                  )}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="text-xl">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getRelativeTime(notification.date)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsMenu;
