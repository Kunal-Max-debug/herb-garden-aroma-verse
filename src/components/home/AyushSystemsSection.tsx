
import { ayushSystems } from '@/data/systems';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AyushSystemsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-garden-dark mb-4">AYUSH Medical Systems</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the traditional healing systems from India that form the foundation of AYUSH medicine, 
            each with its unique principles and therapeutic approaches.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ayushSystems.map((system) => (
            <Card key={system.id} className="border-garden-light hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-garden-primary">{system.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">{system.description}</p>
                <div className="space-y-2 mb-4">
                  {system.principles.map((principle, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-garden-light flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                        <span className="text-xs font-medium text-garden-primary">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700">{principle}</p>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" size="sm" className="w-full border-garden-primary text-garden-primary hover:bg-garden-primary hover:text-white">
                  <Link to={`/categories?system=${system.id}`}>
                    Explore {system.name} Plants
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AyushSystemsSection;
