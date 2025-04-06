
import { Card, CardContent } from '@/components/ui/card';
import { Search, Leaf, BookOpen, Video } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Search size={24} className="text-garden-primary" />,
      title: "Comprehensive Plant Database",
      description: "Explore detailed information on hundreds of medicinal plants used in traditional AYUSH practices."
    },
    {
      icon: <Leaf size={24} className="text-garden-primary" />,
      title: "Interactive 3D Models",
      description: "Examine plants from every angle with detailed 3D models to better understand their structure and characteristics."
    },
    {
      icon: <BookOpen size={24} className="text-garden-primary" />,
      title: "Traditional Knowledge",
      description: "Discover centuries-old wisdom about medicinal uses, preparation methods, and traditional applications."
    },
    {
      icon: <Video size={24} className="text-garden-primary" />,
      title: "Virtual Tours",
      description: "Take guided virtual tours organized by medicinal properties, AYUSH systems, or plant families."
    }
  ];

  return (
    <section className="py-16 bg-garden-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-garden-dark mb-4">Explore Our Virtual Garden</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our digital platform offers an immersive experience to learn about medicinal plants
            used in traditional AYUSH healing systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border-none shadow hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 bg-garden-light rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-garden-dark mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
