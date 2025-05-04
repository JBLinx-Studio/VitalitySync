
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from '@/types/health';

interface UserAvatarProps {
  userProfile: UserProfile | null;
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ userProfile, className = "" }) => {
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
    // @ts-ignore - We're checking for existence of properties that might not be in the type
    const imageSrc = userProfile?.avatar || userProfile?.profileImage || userProfile?.photoUrl || userProfile?.image;
    return imageSrc || "/placeholder.svg";
  };

  return (
    <Avatar className={className}>
      <AvatarImage src={getAvatarSrc()} alt={userProfile?.name || "User"} />
      <AvatarFallback>{getInitials()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
