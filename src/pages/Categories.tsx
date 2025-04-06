
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { categoriesData } from '@/data/categories';
import { ayushSystems } from '@/data/systems';
import { getPlantsByCategory, getPlantsBySystem, plantsData } from '@/data/plants';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlantGrid from '@/components/plants/PlantGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

const CategoriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'systems' | 'categories'>('systems');
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get system or category from URL params
  useEffect(() => {
    const systemParam = searchParams.get('system');
    const categoryParam = searchParams.get('category');
    
    if (systemParam) {
      setActiveTab('systems');
      setSelectedSystem(systemParam);
    } else if (categoryParam) {
      setActiveTab('categories');
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const handleSystemChange = (systemId: string) => {
    setSelectedSystem(systemId);
    setSearchParams({ system: systemId });
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId });
  };

  const handleTabChange = (tab: 'systems' | 'categories') => {
    setActiveTab(tab);
    if (tab === 'systems') {
      if (selectedSystem) {
        setSearchParams({ system: selectedSystem });
      } else {
        setSearchParams({});
      }
    } else {
      if (selectedCategory) {
        setSearchParams({ category: selectedCategory });
      } else {
        setSearchParams({});
      }
    }
  };

  // Get plants based on selected system or category
  const getFilteredPlants = () => {
    if (activeTab === 'systems' && selectedSystem) {
      return getPlantsBySystem(selectedSystem);
    } else if (activeTab === 'categories' && selectedCategory) {
      return getPlantsByCategory(selectedCategory);
    }
    return [];
  };

  const filteredPlants = getFilteredPlants();
  
  // Get the selected system or category object
  const selectedSystemObject = selectedSystem 
    ? ayushSystems.find(sys => sys.id === selectedSystem) 
    : null;
  
  const selectedCategoryObject = selectedCategory 
    ? categoriesData.find(cat => cat.id === selectedCategory) 
    : null;

  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-garden-dark mb-3">Browse by Categories</h1>
          <p className="text-gray-600 max-w-3xl">
            Explore medicinal plants organized by AYUSH medical systems or by their therapeutic properties.
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => handleTabChange(value as 'systems' | 'categories')}
          className="w-full mb-8"
        >
          <TabsList className="w-full max-w-md mx-auto bg-garden-light mb-6">
            <TabsTrigger 
              value="systems" 
              className="flex-1 data-[state=active]:bg-garden-primary data-[state=active]:text-white"
            >
              AYUSH Medical Systems
            </TabsTrigger>
            <TabsTrigger 
              value="categories" 
              className="flex-1 data-[state=active]:bg-garden-primary data-[state=active]:text-white"
            >
              Therapeutic Properties
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="systems" className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                {ayushSystems.map((system) => (
                  <Button
                    key={system.id}
                    variant={selectedSystem === system.id ? "default" : "outline"}
                    className={`w-full justify-start text-left ${
                      selectedSystem === system.id 
                        ? "bg-garden-primary hover:bg-garden-dark text-white" 
                        : "hover:bg-garden-light text-garden-dark border-garden-primary/30"
                    }`}
                    onClick={() => handleSystemChange(system.id)}
                  >
                    <span className="truncate">{system.name}</span>
                  </Button>
                ))}
              </div>
              
              <div className="md:col-span-2">
                {selectedSystemObject ? (
                  <div className="space-y-6">
                    <Card className="border-garden-light">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl text-garden-dark">{selectedSystemObject.name}</CardTitle>
                            <CardDescription>AYUSH Medical System</CardDescription>
                          </div>
                          <Leaf className="h-6 w-6 text-garden-primary" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{selectedSystemObject.description}</p>
                        <h3 className="font-medium text-garden-dark mb-2">Key Principles:</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          {selectedSystemObject.principles.map((principle, index) => (
                            <li key={index}>{principle}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    
                    {filteredPlants.length > 0 ? (
                      <PlantGrid 
                        plants={filteredPlants}
                        title={`${selectedSystemObject.name} Medicinal Plants`}
                      />
                    ) : (
                      <div className="text-center py-12 bg-garden-light/50 rounded-lg">
                        <Leaf className="mx-auto h-12 w-12 text-garden-primary/50 mb-2" />
                        <h3 className="text-lg font-medium text-garden-dark mb-1">No Plants Found</h3>
                        <p className="text-gray-500">We're still growing our collection. Check back soon!</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-garden-light/50 rounded-lg">
                    <h3 className="text-lg font-medium text-garden-dark mb-1">Select a Medical System</h3>
                    <p className="text-gray-500">Choose an AYUSH system from the list to view related plants.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                {categoriesData.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`w-full justify-start text-left ${
                      selectedCategory === category.id 
                        ? "bg-garden-accent hover:bg-garden-primary text-white" 
                        : "hover:bg-garden-light text-garden-dark border-garden-primary/30"
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <span className="truncate">{category.name}</span>
                  </Button>
                ))}
              </div>
              
              <div className="md:col-span-2">
                {selectedCategoryObject ? (
                  <div className="space-y-6">
                    <Card className="border-garden-light">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl text-garden-dark">{selectedCategoryObject.name}</CardTitle>
                            <CardDescription>Therapeutic Property</CardDescription>
                          </div>
                          <Leaf className="h-6 w-6 text-garden-accent" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{selectedCategoryObject.description}</p>
                      </CardContent>
                    </Card>
                    
                    {filteredPlants.length > 0 ? (
                      <PlantGrid 
                        plants={filteredPlants}
                        title={`Plants for ${selectedCategoryObject.name}`}
                      />
                    ) : (
                      <div className="text-center py-12 bg-garden-light/50 rounded-lg">
                        <Leaf className="mx-auto h-12 w-12 text-garden-primary/50 mb-2" />
                        <h3 className="text-lg font-medium text-garden-dark mb-1">No Plants Found</h3>
                        <p className="text-gray-500">We're still growing our collection. Check back soon!</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-garden-light/50 rounded-lg">
                    <h3 className="text-lg font-medium text-garden-dark mb-1">Select a Therapeutic Property</h3>
                    <p className="text-gray-500">Choose a category from the list to view related plants.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
