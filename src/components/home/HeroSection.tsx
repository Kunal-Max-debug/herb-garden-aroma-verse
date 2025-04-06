
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-garden-dark text-white">
      <div 
        className="absolute inset-0 z-0 opacity-30" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1585996913655-5bf7c8b2653d?q=80&w=1000&auto=format&fit=crop')", 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          filter: "brightness(0.4)"
        }}
      ></div>
      
      <div className="container mx-auto relative z-10 py-20 md:py-32 px-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Leaf className="h-8 w-8 text-garden-accent animate-leaf-sway" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Virtual Herbal Garden
            </h1>
          </div>
          
          <h2 className="text-xl md:text-2xl font-medium mb-6 text-garden-accent">
            Explore the Healing Wisdom of AYUSH Medicinal Plants
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl">
            Discover an interactive journey through traditional medicinal herbs used in Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy systems of medicine.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-garden-primary hover:bg-garden-dark text-white border-2 border-garden-primary hover:border-white transition-colors">
              <Link to="/garden">
                Explore The Garden
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent hover:bg-garden-primary/20 text-white border-2 border-white">
              <Link to="/about">
                Learn About AYUSH
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-garden-dark to-transparent"></div>
    </div>
  );
};

export default HeroSection;
