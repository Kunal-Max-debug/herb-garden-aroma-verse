
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Leaf, Bot, Stethoscope, Info } from 'lucide-react';
import { Plant } from '@/types';
import { plantsData } from '@/data/plants';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Map of common diseases/conditions to relevant plant recommendations
const diseaseToPlantMap: Record<string, string[]> = {
  "headache": ["mint", "tulsi"],
  "cold": ["tulsi", "mint"],
  "fever": ["tulsi", "neem"],
  "cough": ["tulsi", "mint"],
  "diabetes": ["neem"],
  "inflammation": ["turmeric"],
  "digestive": ["mint"],
  "skin": ["neem", "turmeric"],
  "stress": ["ashwagandha", "tulsi"],
  "anxiety": ["ashwagandha"],
  "sleep": ["ashwagandha"],
  "immune": ["tulsi", "turmeric"],
  "pain": ["turmeric", "mint"],
  "joint pain": ["turmeric"],
  "arthritis": ["turmeric"],
  "respiratory": ["tulsi", "mint"]
};

// Map of keywords for matching
const keywordMap: Record<string, string[]> = {
  "headache": ["headache", "migraine", "head pain", "head ache"],
  "cold": ["cold", "flu", "runny nose", "sneezing", "congestion"],
  "fever": ["fever", "temperature", "high temperature"],
  "cough": ["cough", "sore throat", "throat irritation"],
  "diabetes": ["diabetes", "blood sugar", "sugar level"],
  "inflammation": ["inflammation", "swelling", "inflamed"],
  "digestive": ["digestive", "indigestion", "stomach", "gas", "bloating", "constipation"],
  "skin": ["skin", "rash", "acne", "eczema", "itching"],
  "stress": ["stress", "tension", "burnout"],
  "anxiety": ["anxiety", "anxious", "worry", "nervous"],
  "sleep": ["sleep", "insomnia", "sleepless", "can't sleep"],
  "immune": ["immune", "immunity", "resistance"],
  "pain": ["pain", "ache", "soreness"],
  "joint pain": ["joint", "joint pain", "knee pain", "arthritis"],
  "arthritis": ["arthritis", "joint inflammation"],
  "respiratory": ["respiratory", "breathing", "breath", "lung"]
};

const AiRecommendations = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedPlants, setRecommendedPlants] = useState<Plant[]>([]);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [detailedRecommendation, setDetailedRecommendation] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Advanced recommendation system based on disease mapping
  const getRecommendations = (userQuery: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      try {
        const normalizedQuery = userQuery.toLowerCase();
        const keywords = normalizedQuery.split(/\s+/);
        
        // Track matched conditions for better context
        const matchedConditions: string[] = [];
        const matchedPlantIds = new Set<string>();
        
        // Check for matches in our keyword map first
        Object.entries(keywordMap).forEach(([condition, conditionKeywords]) => {
          if (conditionKeywords.some(keyword => normalizedQuery.includes(keyword))) {
            matchedConditions.push(condition);
            
            // Add related plants
            const plantIds = diseaseToPlantMap[condition] || [];
            plantIds.forEach(id => matchedPlantIds.add(id));
          }
        });
        
        // If no direct matches, use the general keyword search
        if (matchedPlantIds.size === 0) {
          plantsData.forEach(plant => {
            const medicinalUsesText = plant.medicinalUses.join(' ').toLowerCase();
            const descriptionText = plant.description.toLowerCase();
            const commonNamesText = plant.commonNames.join(' ').toLowerCase();
            
            if (keywords.some(keyword => 
              keyword.length > 3 && (
                medicinalUsesText.includes(keyword) || 
                descriptionText.includes(keyword) ||
                commonNamesText.includes(keyword)
              )
            )) {
              matchedPlantIds.add(plant.id);
            }
          });
        }
        
        // Get actual plant objects
        const filteredPlants = plantsData.filter(plant => matchedPlantIds.has(plant.id));
        
        // Generate AI response based on the condition and plants
        let response = '';
        let detailedResponse = '';
        
        if (filteredPlants.length > 0) {
          // Create more specific responses based on matched conditions
          if (matchedConditions.length > 0) {
            const conditionsText = matchedConditions.join(", ");
            response = `Based on your concern about "${userQuery}", I've identified potential conditions like ${conditionsText}. I recommend these AYUSH medicinal plants that may help with these specific issues:`;
            
            // Create detailed response with condition-specific advice
            detailedResponse = `# AYUSH Treatment Recommendations\n\n`;
            detailedResponse += `## For conditions related to: ${conditionsText}\n\n`;
            
            filteredPlants.forEach(plant => {
              detailedResponse += `### ${plant.name} (${plant.botanicalName})\n\n`;
              
              // Find relevant medicinal uses for the condition
              const relevantUses = plant.medicinalUses.filter(use => {
                return matchedConditions.some(condition => 
                  use.toLowerCase().includes(condition.toLowerCase())
                );
              });
              
              if (relevantUses.length > 0) {
                detailedResponse += "**Relevant medicinal properties:**\n";
                relevantUses.forEach(use => detailedResponse += `- ${use}\n`);
              } else {
                detailedResponse += "**General medicinal properties:**\n";
                plant.medicinalUses.slice(0, 2).forEach(use => detailedResponse += `- ${use}\n`);
              }
              
              // Add preparation info if available
              if (plant.medicinialRecipes && plant.medicinialRecipes.length > 0) {
                detailedResponse += "\n**Suggested preparation method:**\n";
                const recipe = plant.medicinialRecipes[0];
                detailedResponse += `- ${recipe.name}\n`;
                detailedResponse += `- Ingredients: ${recipe.ingredients.join(", ")}\n`;
                detailedResponse += `- Preparation: ${recipe.preparation}\n`;
                detailedResponse += `- Uses: ${recipe.uses}\n`;
              }
              
              detailedResponse += "\n";
            });
            
            // Add disclaimer
            detailedResponse += "## Important Health Disclaimer\n\n";
            detailedResponse += "This information is provided for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare provider before starting any new health regimen, especially if you have pre-existing conditions or are taking medication.\n\n";
            detailedResponse += "AYUSH systems like Ayurveda, Yoga, Unani, Siddha, and Homeopathy offer traditional approaches to health, but should complement rather than replace conventional medical care for serious conditions.";
          } else {
            response = `Based on your concern about "${userQuery}", I recommend considering the following medicinal plants from AYUSH systems. These plants have traditional uses related to your symptoms, but remember to consult with a qualified healthcare practitioner before starting any herbal treatment.`;
            
            // Generic detailed response
            detailedResponse = `# AYUSH Plant Recommendations\n\n`;
            detailedResponse += `Based on your query about "${userQuery}", I've recommended these traditional medicinal plants. Here's more information about each:\n\n`;
            
            filteredPlants.forEach(plant => {
              detailedResponse += `### ${plant.name} (${plant.botanicalName})\n\n`;
              detailedResponse += `**Systems of medicine:** ${plant.systems.join(", ")}\n`;
              detailedResponse += `**Common names:** ${plant.commonNames.join(", ")}\n\n`;
              detailedResponse += `**Medicinal properties:**\n`;
              plant.medicinalUses.forEach(use => detailedResponse += `- ${use}\n`);
              detailedResponse += "\n";
            });
            
            // Add disclaimer
            detailedResponse += "## Important Health Disclaimer\n\n";
            detailedResponse += "This information is provided for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare provider before starting any new health regimen.";
          }
        } else {
          response = `I couldn't find specific medicinal plants for "${userQuery}" in our database. Please try describing your symptoms differently or consult with an AYUSH practitioner for personalized advice.`;
          detailedResponse = "No specific plant recommendations found for your query. Try using more specific terms related to symptoms or conditions rather than medical diagnoses.";
        }
        
        setRecommendedPlants(filteredPlants);
        setAiResponse(response);
        setDetailedRecommendation(detailedResponse);
        
        if (filteredPlants.length > 0) {
          toast.success(`Found ${filteredPlants.length} plant recommendations for your condition`);
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
                <Stethoscope className="h-5 w-5 text-garden-primary" />
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
                  {isLoading ? "Analyzing your concern..." : "Get Plant Recommendations"}
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
                <p className="text-gray-800 mb-4">
                  {aiResponse}
                </p>
                
                {recommendedPlants.length > 0 && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="mb-6 flex items-center gap-1 text-garden-primary border-garden-primary"
                      >
                        <Info size={16} />
                        View Detailed AYUSH Treatment Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-garden-dark flex items-center gap-2">
                          <Stethoscope className="h-5 w-5 text-garden-primary" />
                          AYUSH Treatment Recommendations
                        </DialogTitle>
                      </DialogHeader>
                      <div className="prose prose-green max-w-none mt-4">
                        {detailedRecommendation.split("\n").map((line, index) => {
                          if (line.startsWith("# ")) {
                            return <h1 key={index} className="text-2xl font-bold mb-4">{line.substring(2)}</h1>;
                          } else if (line.startsWith("## ")) {
                            return <h2 key={index} className="text-xl font-semibold mb-3 text-garden-dark">{line.substring(3)}</h2>;
                          } else if (line.startsWith("### ")) {
                            return <h3 key={index} className="text-lg font-medium mb-2 text-garden-primary">{line.substring(4)}</h3>;
                          } else if (line.startsWith("**") && line.endsWith("**")) {
                            return <p key={index} className="font-semibold my-2">{line.substring(2, line.length - 2)}</p>;
                          } else if (line.startsWith("- ")) {
                            return <p key={index} className="ml-4 my-1">• {line.substring(2)}</p>;
                          } else {
                            return <p key={index} className="my-2">{line}</p>;
                          }
                        })}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                
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
