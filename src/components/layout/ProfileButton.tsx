
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const ProfileButton = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.username}`} />
            <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-sm font-medium text-garden-dark">
            {user?.username}
          </span>
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-garden-primary hover:bg-garden-light/50">
              <User className="h-4 w-4 mr-1" /> 
              Login
            </Button>
          </Link>
          <Link to="/signup" className="hidden md:block">
            <Button size="sm" className="bg-garden-primary hover:bg-garden-primary/90">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ProfileButton;
