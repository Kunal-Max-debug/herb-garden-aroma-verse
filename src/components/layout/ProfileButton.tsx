
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogIn, UserPlus } from 'lucide-react';

const ProfileButton = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-garden-light/50 transition-colors">
          <Avatar className="h-8 w-8 border-2 border-garden-primary">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.username}`} />
            <AvatarFallback className="bg-garden-primary text-white">{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-sm font-medium text-garden-dark">
            {user?.username}
          </span>
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-garden-primary hover:bg-garden-light/50 flex items-center gap-1">
              <LogIn className="h-4 w-4" /> 
              Login
            </Button>
          </Link>
          <Link to="/signup" className="hidden md:block">
            <Button size="sm" className="bg-garden-primary hover:bg-garden-primary/90 flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProfileButton;
