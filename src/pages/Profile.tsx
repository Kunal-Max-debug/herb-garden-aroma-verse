
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "sonner";

const Profile = () => {
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container max-w-md mx-auto my-12 px-4">
        <Card className="border-garden-light">
          <CardHeader className="space-y-1">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.username}`} />
                <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-garden-dark mt-4">
              {user?.username}
            </CardTitle>
            <CardDescription className="text-center">{user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-garden-light/30 p-4 rounded-md">
              <h3 className="font-medium text-garden-dark">Account Information</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Member since {new Date(parseInt(user?.id || "0")).toLocaleDateString()}
              </p>
            </div>
            
            <div className="bg-garden-light/30 p-4 rounded-md">
              <h3 className="font-medium text-garden-dark">Your AYUSH Garden</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Explore medicinal plants and their benefits
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-garden-primary hover:bg-garden-primary/90" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
