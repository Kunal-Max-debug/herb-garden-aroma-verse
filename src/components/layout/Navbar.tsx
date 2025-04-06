
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Leaf, Menu, X } from 'lucide-react';
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Garden', path: '/garden' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be implemented with actual search functionality
    console.log(`Search query: ${searchQuery}`);
  };

  return (
    <nav className="bg-garden-primary text-white py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Leaf className="h-6 w-6 animate-leaf-sway" />
          <span>AYUSH Virtual Herbal Garden</span>
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:bg-garden-dark"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="search"
              placeholder="Search plants..."
              className="w-64 pl-10 pr-4 py-2 rounded-md bg-garden-dark text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-garden-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={16} />
          </form>
          
          <div className="flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'bg-garden-dark text-white'
                    : 'text-white hover:bg-garden-dark/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-garden-dark rounded-md shadow-lg p-4 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <Input
              type="search"
              placeholder="Search plants..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-garden-primary text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-garden-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={16} />
          </form>
          
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'bg-garden-primary text-white'
                    : 'text-white hover:bg-garden-primary/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
