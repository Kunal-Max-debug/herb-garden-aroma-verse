
import React, { useRef, useState } from 'react';
import { Camera, Upload, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PlantInfoCard from '@/components/tour/PlantInfoCard';
import { plantsData, getPlantById } from '@/data/plants';
import { useToast } from '@/components/ui/use-toast';

const PlantIdentification = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showNonPlantDialog, setShowNonPlantDialog] = useState(false);
  const [identifiedPlant, setIdentifiedPlant] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState<number>(0);
  const [matchingResults, setMatchingResults] = useState<Array<{id: string, score: number}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const identifyPlant = async (imageUrl: string): Promise<void> => {
    setIsIdentifying(true);
    
    try {
      // Simulate AI processing with a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For a real implementation, here we would:
      // 1. Send the image to an AI model for plant recognition
      // 2. Process the results to identify plant species
      
      // For this demo, we'll simulate AI identification using our dataset
      // This simulates analyzing visual features and comparing to known plant images
      const results = simulateAIPlantIdentification(imageUrl);
      
      if (results.isPlant) {
        // Found a match with high confidence
        setMatchingResults(results.matches);
        setIdentifiedPlant(results.matches[0].id);
        setConfidenceScore(results.matches[0].score);
        
        toast({
          title: "Plant Identified",
          description: `Identified as ${getPlantById(results.matches[0].id)?.name} with ${(results.matches[0].score * 100).toFixed(2)}% confidence.`,
          variant: "default",
        });
      } else {
        // No plant detected in image
        setShowNonPlantDialog(true);
        setIdentifiedPlant(null);
        
        toast({
          title: "Not a Plant",
          description: "The image doesn't appear to contain a recognizable plant.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Identification Error",
        description: "There was a problem identifying the plant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsIdentifying(false);
    }
  };

  const simulateAIPlantIdentification = (imageUrl: string) => {
    // This function simulates AI plant identification
    // In a real implementation, this would use a computer vision model
    
    // For demo purposes, we'll use a deterministic approach based on the image URL string
    // This ensures we get consistent results for the same image
    const hash = imageUrl.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);
    
    // Determine if it's a plant (80% chance)
    const isPlant = (hash % 100) < 80;
    
    if (!isPlant) {
      return { isPlant: false, matches: [] };
    }
    
    // Select plants based on the hash value
    const plantIndex = hash % plantsData.length;
    const matches = [
      { 
        id: plantsData[plantIndex].id, 
        score: 0.92 + (hash % 8) / 100 // Confidence between 92% and 99%
      }
    ];
    
    // Add secondary matches with lower confidence
    const secondPlantIndex = (hash + 1) % plantsData.length;
    const thirdPlantIndex = (hash + 2) % plantsData.length;
    
    matches.push({ 
      id: plantsData[secondPlantIndex].id, 
      score: 0.75 + (hash % 15) / 100 
    });
    
    matches.push({ 
      id: plantsData[thirdPlantIndex].id, 
      score: 0.60 + (hash % 15) / 100 
    });
    
    return { isPlant: true, matches };
  };

  const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      await identifyPlant(imageUrl);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetImage = () => {
    setSelectedImage(null);
    setIdentifiedPlant(null);
    setShowNonPlantDialog(false);
    setMatchingResults([]);
    setConfidenceScore(0);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-garden-dark mb-6">Plant Identification</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Capture or Upload Plant Image</h2>
            
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                className="hidden"
                ref={fileInputRef}
              />
              
              <div className="flex gap-4">
                <Button
                  onClick={handleCameraClick}
                  className="flex-1 bg-garden-primary hover:bg-garden-dark"
                  disabled={isIdentifying}
                >
                  <Camera className="mr-2" />
                  Take Photo
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1 border-garden-primary text-garden-primary hover:bg-garden-light"
                  disabled={isIdentifying}
                >
                  <Upload className="mr-2" />
                  Upload Image
                </Button>
              </div>
              
              {selectedImage && (
                <div className="mt-4">
                  <img
                    src={selectedImage}
                    alt="Captured plant"
                    className="w-full rounded-lg shadow-md"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <Button 
                      onClick={resetImage}
                      variant="outline"
                    >
                      Try Another Image
                    </Button>
                    
                    {isIdentifying && (
                      <div className="flex items-center gap-2 text-garden-primary">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Identifying plant...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div>
            {identifiedPlant && (
              <div>
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800">Identification Results</h3>
                  <p className="text-green-700 mt-1">
                    Primary match: <span className="font-bold">{getPlantById(identifiedPlant)?.name}</span> with {(confidenceScore * 100).toFixed(2)}% confidence
                  </p>
                  
                  {matchingResults.length > 1 && (
                    <div className="mt-2">
                      <p className="text-sm text-green-700">Other possible matches:</p>
                      <ul className="mt-1 list-disc list-inside text-sm">
                        {matchingResults.slice(1, 3).map((result, index) => (
                          <li key={index} className="text-green-700">
                            {getPlantById(result.id)?.name} ({(result.score * 100).toFixed(2)}%)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <PlantInfoCard plant={identifiedPlant} />
              </div>
            )}
          </div>
        </div>

        <Dialog open={showNonPlantDialog} onOpenChange={setShowNonPlantDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Not a Plant Image</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p className="text-gray-600">
                Our AI analysis indicates this image doesn't appear to contain a recognizable medicinal plant. Please try uploading a clearer image of a plant for identification.
              </p>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Non-plant image"
                  className="mt-4 rounded-lg shadow-md"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default PlantIdentification;
