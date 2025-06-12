
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserProfile } from '@/types/health';

interface UserAvatarProps {
  userProfile: UserProfile | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  userProfile, 
  className = "",
  size = 'md'
}) => {
  // Get user's initials for the fallback
  const getInitials = () => {
    if (!userProfile || !userProfile.name) return "U";
    
    const nameParts = userProfile.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    
    return nameParts[0][0] || "U";
  };

  // Use a safe property access for the avatar/profileImage
  const getAvatarSrc = () => {
    // Check for various possible profile image properties
    const imageSrc = userProfile?.avatar || userProfile?.profileImage || userProfile?.photoUrl || userProfile?.image;
    return imageSrc || "/placeholder.svg";
  };

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className} ring-2 ring-offset-2 ring-offset-background ring-health-primary/30 hover:ring-health-primary transition-all`}>
      <AvatarImage 
        src={getAvatarSrc()} 
        alt={userProfile?.name || "User"} 
        className="object-cover" 
      />
      <AvatarFallback className="bg-gradient-to-br from-health-primary to-health-secondary text-white">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
