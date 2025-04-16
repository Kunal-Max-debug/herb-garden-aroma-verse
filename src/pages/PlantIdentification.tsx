
import React, { useRef, useState } from 'react';
import { Camera, Upload } from 'lucide-react';
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
import { plantsData } from '@/data/plants';

const PlantIdentification = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showNonPlantDialog, setShowNonPlantDialog] = useState(false);
  const [identifiedPlant, setIdentifiedPlant] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      
      // For demo purposes, randomly select a plant or show non-plant dialog
      const random = Math.random();
      if (random > 0.3) {
        const randomPlant = plantsData[Math.floor(Math.random() * plantsData.length)].id;
        setIdentifiedPlant(randomPlant);
      } else {
        setShowNonPlantDialog(true);
      }
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
                >
                  <Camera className="mr-2" />
                  Take Photo
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="flex-1 border-garden-primary text-garden-primary hover:bg-garden-light"
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
                  <Button 
                    onClick={resetImage}
                    variant="outline"
                    className="mt-2"
                  >
                    Try Another Image
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <div>
            {identifiedPlant && <PlantInfoCard plant={identifiedPlant} />}
          </div>
        </div>

        <Dialog open={showNonPlantDialog} onOpenChange={setShowNonPlantDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Not a Plant Image</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p className="text-gray-600">
                The image you uploaded doesn't appear to be a plant. Please try uploading a clear image of a plant for identification.
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
