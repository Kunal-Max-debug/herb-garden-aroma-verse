
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X, Bot } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-garden-primary" />
            <span className="font-semibold text-xl text-garden-dark">AYUSH Garden</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                ? 'text-garden-primary bg-garden-light' 
                : 'text-gray-600 hover:text-garden-primary hover:bg-garden-light/50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/garden" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/garden') 
                ? 'text-garden-primary bg-garden-light' 
                : 'text-gray-600 hover:text-garden-primary hover:bg-garden-light/50'
              }`}
            >
              Garden
            </Link>
            <Link 
              to="/categories" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/categories') 
                ? 'text-garden-primary bg-garden-light' 
                : 'text-gray-600 hover:text-garden-primary hover:bg-garden-light/50'
              }`}
            >
              Categories
            </Link>
            <Link 
              to="/ai-recommendations" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/ai-recommendations') 
                ? 'text-garden-primary bg-garden-light' 
                : 'text-gray-600 hover:text-garden-primary hover:bg-garden-light/50'
              }`}
            >
              <span className="flex items-center gap-1">
                <Bot size={16} />
                AI Recommendations
              </span>
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/about') 
                ? 'text-garden-primary bg-garden-light' 
                : 'text-gray-600 hover:text-garden-primary hover:bg-garden-light/50'
              }`}
            >
              About
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-garden-dark" />
            ) : (
              <Menu className="h-6 w-6 text-garden-dark" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="pt-4 pb-3 border-t border-gray-200 md:hidden">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') 
                  ? 'text-garden-primary bg-garden-light' 
                  : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/garden" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/garden') 
                  ? 'text-garden-primary bg-garden-light' 
                  : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Garden
              </Link>
              <Link 
                to="/categories" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/categories') 
                  ? 'text-garden-primary bg-garden-light' 
                  : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/ai-recommendations" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/ai-recommendations') 
                  ? 'text-garden-primary bg-garden-light' 
                  : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center gap-1">
                  <Bot size={16} />
                  AI Recommendations
                </span>
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/about') 
                  ? 'text-garden-primary bg-garden-light' 
                  : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
