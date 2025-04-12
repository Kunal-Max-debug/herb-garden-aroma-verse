
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogIn, UserPlus, Leaf3d } from 'lucide-react';

const ProfileButton = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
          <Link to="/start-tour" className="hidden md:flex items-center gap-1 px-3 py-2 rounded-md bg-garden-light/80 text-garden-primary hover:bg-garden-light transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19c.5 0 1-.1 1.4-.4.6-.4.6-1 .6-1.6v-1.5c0-.5.2-.8.6-1.1.4-.3 1.6-.7 1.9-1.2.3-.4.5-.9.5-1.4 0-.5-.3-1.3-.8-1.7-.4-.4-1-.7-1.7-.8-.5-.1-.9-.5-.9-1s.4-1 .9-1.2c.6-.1 1.2-.4 1.6-1 .4-.5.6-1.2.6-1.9 0-.8-.6-1.5-1.3-1.9-.6-.3-1.4-.5-2.1-.5h-.1c-1.2.1-2.3.5-3.3 1.2-.9.7-1.6 1.7-2 2.8C8.5 8 8.6 9.1 9 10.2c.4 1.1 1.2 2 2.3 2.7.8.5 1.1 1.5.8 2.3-.3.9-1.2 1.3-2.2 1.3-.4 0-.7-.1-1-.3-.6-.3-.9-.8-.9-1.5 0-1 .8-1.6 1.7-1.8.8-.1 1.3-1 1.1-1.8-.2-.8-1.1-1.3-1.9-1-.6.1-1.2.5-1.5 1-.4.6-.5 1.2-.5 1.9 0 .9.3 1.7.9 2.4.6.7 1.4 1.1 2.3 1.3.6.1 1 .5 1 1.1v2c0 .5 0 1.1.5 1.4.3.2.8.4 1.4.4Z"></path>
              <path d="M14 20.5v-4"></path>
              <path d="M10 20.5v-2"></path>
              <path d="M16 12.5v-2"></path>
              <path d="M8 15.5v-5"></path>
            </svg>
            <span className="text-sm font-medium">3D Tour</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-garden-light/50 transition-colors">
            <Avatar className="h-8 w-8 border-2 border-garden-primary">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.username}`} />
              <AvatarFallback className="bg-garden-primary text-white">{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="hidden md:inline text-sm font-medium text-garden-dark">
              {user?.username}
            </span>
          </Link>
        </div>
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
