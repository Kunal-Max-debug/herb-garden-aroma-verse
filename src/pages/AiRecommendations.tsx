
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Leaf, Search, Bot } from 'lucide-react';
import { Plant } from '@/types';
import { plantsData } from '@/data/plants';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const AiRecommendations = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedPlants, setRecommendedPlants] = useState<Plant[]>([]);
  const [aiResponse, setAiResponse] = useState<string>('');

  // Simple recommendation algorithm based on keywords in the description
  const getRecommendations = (userQuery: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const normalizedQuery = userQuery.toLowerCase();
        const keywords = normalizedQuery.split(/\s+/);
        
        // Filter plants based on keywords in medicinal uses or description
        const filteredPlants = plantsData.filter(plant => {
          const medicinalUsesText = plant.medicinalUses.join(' ').toLowerCase();
          const descriptionText = plant.description.toLowerCase();
          const commonNamesText = plant.commonNames.join(' ').toLowerCase();
          
          return keywords.some(keyword => 
            keyword.length > 3 && (
              medicinalUsesText.includes(keyword) || 
              descriptionText.includes(keyword) ||
              commonNamesText.includes(keyword)
            )
          );
        });
        
        // Generate a simple AI response based on the query
        let response = '';
        if (filteredPlants.length > 0) {
          response = `Based on your concern about "${userQuery}", I recommend considering the following medicinal plants from AYUSH systems. These plants have traditional uses related to your symptoms, but remember to consult with a qualified healthcare practitioner before starting any herbal treatment.`;
        } else {
          response = `I couldn't find specific medicinal plants for "${userQuery}" in our database. Please try describing your symptoms differently or consult with an AYUSH practitioner for personalized advice.`;
        }
        
        setRecommendedPlants(filteredPlants);
        setAiResponse(response);
        
        if (filteredPlants.length > 0) {
          toast.success(`Found ${filteredPlants.length} plant recommendations`);
        } else {
          toast.info(`No specific plants found for your query. Try different keywords.`);
        }
      } catch (error) {
        toast.error("Error generating recommendations");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length < 3) {
      toast.warning("Please enter a more specific health concern");
      return;
    }
    getRecommendations(query);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-6 w-6 text-garden-primary" />
            <h1 className="text-3xl font-bold text-garden-dark">AYUSH AI Recommendations</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Describe your health concern or condition, and our AI will suggest traditional AYUSH medicinal plants that may help.
            <span className="block mt-2 text-sm italic">
              Note: These suggestions are informational only and should not replace professional medical advice.
            </span>
          </p>
          
          <Card className="mb-8 border-garden-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-garden-primary" />
                Ask about a Health Concern
              </CardTitle>
              <CardDescription>
                Be specific about your symptoms or health conditions for better recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="query" className="text-sm font-medium">
                    Health concern or condition
                  </label>
                  <Textarea 
                    id="query"
                    placeholder="E.g., chronic digestive issues, joint pain, stress and anxiety, etc."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-24"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-garden-primary hover:bg-garden-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Get Plant Recommendations"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {aiResponse && (
            <Card className="mb-8 border-garden-primary/20 bg-garden-light/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-garden-primary" />
                  AI Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 mb-6">
                  {aiResponse}
                </p>
                
                {recommendedPlants.length > 0 ? (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    {recommendedPlants.map((plant) => (
                      <Card key={plant.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex h-full">
                          <div 
                            className="w-1/3 bg-cover bg-center"
                            style={{ backgroundImage: `url(${plant.imageUrl})` }}
                          ></div>
                          <div className="w-2/3 p-4">
                            <h3 className="font-semibold text-garden-dark">{plant.name}</h3>
                            <p className="text-xs italic mb-2">{plant.botanicalName}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-2">
                              {plant.systems.map((system) => (
                                <Badge key={system} variant="outline" className="text-xs">
                                  {system}
                                </Badge>
                              ))}
                            </div>
                            
                            <Button 
                              asChild 
                              variant="link" 
                              className="text-garden-primary p-0 h-auto font-medium"
                            >
                              <Link to={`/plant/${plant.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : aiResponse ? (
                  <div className="text-center py-8">
                    <Leaf className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500">Try different keywords or check our plant database</p>
                    <Button asChild variant="outline" className="mt-4">
                      <Link to="/garden">Browse All Plants</Link>
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AiRecommendations;
