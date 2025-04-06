
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getPlantById } from '@/data/plants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bookmark, Leaf, Share } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlantDetail3DViewer from '@/components/plants/PlantDetail3DViewer';
import MedicinalUsesCard from '@/components/plants/MedicinalUsesCard';
import CultivationMethodsCard from '@/components/plants/CultivationMethodsCard';
import MedicinalRecipesCard from '@/components/plants/MedicinalRecipesCard';
import { toast } from 'sonner';

const PlantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const plant = id ? getPlantById(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!plant) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Plant Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the plant you're looking for.</p>
          <Button asChild>
            <Link to="/garden">Return to Garden</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleBookmark = () => {
    toast.success(`${plant.name} has been added to your bookmarks!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `AYUSH Virtual Garden - ${plant.name}`,
        text: `Learn about the medicinal properties of ${plant.name}`,
        url: window.location.href
      }).catch((error) => {
        toast.error(`Error sharing: ${error}`);
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success("Link copied to clipboard!");
      }).catch((error) => {
        toast.error(`Error copying link: ${error}`);
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/garden">
              <ArrowLeft size={16} />
              <span>Back to Garden</span>
            </Link>
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleBookmark}>
              <Bookmark size={16} />
              <span>Save</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={handleShare}>
              <Share size={16} />
              <span>Share</span>
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8 border-b">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-garden-primary" />
                  <h1 className="text-3xl font-bold text-garden-dark">{plant.name}</h1>
                </div>
                <p className="text-gray-600 italic mb-4">{plant.botanicalName}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {plant.systems.map((system) => (
                    <Badge key={system} className="bg-garden-primary text-white">
                      {system}
                    </Badge>
                  ))}
                  {plant.categories.map((category) => (
                    <Badge key={category} variant="outline" className="border-garden-primary text-garden-dark">
                      {category}
                    </Badge>
                  ))}
                </div>
                
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-garden-dark mb-2">Common Names</h2>
                  <div className="flex flex-wrap gap-2">
                    {plant.commonNames.map((name, index) => (
                      <span key={index} className="bg-garden-light text-garden-dark px-3 py-1 rounded-full text-sm">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-garden-dark mb-2">Habitat</h2>
                  <p className="text-gray-700">{plant.habitat}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 bg-garden-light/20">
            <h2 className="text-xl font-semibold text-garden-dark mb-4">About {plant.name}</h2>
            <p className="text-gray-700 mb-6">{plant.description}</p>
            
            <Tabs defaultValue="3d-model" className="w-full">
              <TabsList className="w-full bg-white mb-4">
                <TabsTrigger 
                  value="3d-model"
                  className="flex-1 data-[state=active]:bg-garden-primary data-[state=active]:text-white"
                >
                  Interactive View
                </TabsTrigger>
                <TabsTrigger 
                  value="medicinal-uses"
                  className="flex-1 data-[state=active]:bg-garden-primary data-[state=active]:text-white"
                >
                  Medicinal Uses
                </TabsTrigger>
                <TabsTrigger 
                  value="cultivation"
                  className="flex-1 data-[state=active]:bg-garden-primary data-[state=active]:text-white"
                >
                  Cultivation
                </TabsTrigger>
                <TabsTrigger 
                  value="recipes"
                  className="flex-1 data-[state=active]:bg-garden-primary data-[state=active]:text-white"
                >
                  Recipes
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="3d-model" className="animate-fade-in">
                <PlantDetail3DViewer 
                  plantId={plant.id}
                  modelPath={plant.modelPath}
                  imageUrl={plant.imageUrl}
                />
              </TabsContent>
              
              <TabsContent value="medicinal-uses" className="animate-fade-in">
                <MedicinalUsesCard uses={plant.medicinalUses} />
              </TabsContent>
              
              <TabsContent value="cultivation" className="animate-fade-in">
                <CultivationMethodsCard methods={plant.cultivationMethods} />
              </TabsContent>
              
              <TabsContent value="recipes" className="animate-fade-in">
                <MedicinalRecipesCard recipes={plant.medicinialRecipes} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlantDetail;
