
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate('/profile');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md mx-auto my-12 px-4">
        <Card className="border-garden-light">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-garden-dark">Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-garden-primary hover:bg-garden-primary/90"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-garden-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
