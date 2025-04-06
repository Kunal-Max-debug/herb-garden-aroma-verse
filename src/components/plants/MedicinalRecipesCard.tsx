
import { Recipe } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface MedicinalRecipesCardProps {
  recipes: Recipe[];
}

const MedicinalRecipesCard = ({ recipes }: MedicinalRecipesCardProps) => {
  return (
    <Card className="border-garden-light bg-white shadow">
      <CardHeader className="bg-garden-primary text-white pb-3 pt-4">
        <CardTitle className="text-lg font-medium">Medicinal Recipes</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue={recipes[0]?.name.replace(/\s+/g, '-').toLowerCase() || "tab-0"}>
          <TabsList className="w-full bg-garden-light">
            {recipes.map((recipe, index) => (
              <TabsTrigger 
                key={index} 
                value={recipe.name.replace(/\s+/g, '-').toLowerCase()}
                className="data-[state=active]:bg-garden-primary data-[state=active]:text-white"
              >
                {recipe.name.split(' ').slice(0, 2).join(' ')}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {recipes.map((recipe, index) => (
            <TabsContent 
              key={index} 
              value={recipe.name.replace(/\s+/g, '-').toLowerCase()}
              className="py-4 animate-fade-in"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-garden-dark mb-2">Ingredients</h4>
                  <ul className="list-disc pl-5 text-gray-700">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-garden-dark mb-2">Preparation</h4>
                  <p className="text-gray-700">{recipe.preparation}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-garden-dark mb-2">Uses</h4>
                  <p className="text-gray-700">{recipe.uses}</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MedicinalRecipesCard;
