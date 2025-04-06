
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ayushSystems } from '@/data/systems';
import { Leaf } from 'lucide-react';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-garden-dark mb-3">About the AYUSH Virtual Herbal Garden</h1>
          <p className="text-gray-600 max-w-3xl">
            Learn about our mission to digitally preserve and share the rich botanical heritage 
            of traditional medicine systems from India.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 border-garden-light">
              <CardHeader className="bg-garden-primary text-white">
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4">
                  The AYUSH Virtual Herbal Garden aims to create an accessible digital platform 
                  that showcases the diverse medicinal plants used in traditional Indian medicine systems. 
                  Our goal is to preserve and promote this valuable knowledge for researchers, 
                  practitioners, students, and enthusiasts worldwide.
                </p>
                <p className="text-gray-700 mb-4">
                  By combining modern technology with ancient wisdom, we provide an immersive 
                  educational experience that helps users explore, learn, and understand the 
                  significance of these healing plants through interactive 3D models, 
                  comprehensive information, and multimedia resources.
                </p>
                <p className="text-gray-700">
                  We believe in making traditional knowledge accessible to all, bridging the gap 
                  between ancient practices and modern understanding, and fostering appreciation 
                  for the natural remedies that have supported human health for millennia.
                </p>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-semibold text-garden-dark mb-6 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-garden-primary" />
              AYUSH Medical Systems
            </h2>
            
            <div className="space-y-6">
              {ayushSystems.map((system) => (
                <Card key={system.id} className="border-garden-light">
                  <CardHeader>
                    <CardTitle className="text-xl text-garden-primary">{system.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4">{system.description}</p>
                    <h3 className="font-medium text-garden-dark mb-2">Key Principles:</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      {system.principles.map((principle, index) => (
                        <li key={index}>{principle}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-garden-light">
              <CardHeader className="bg-garden-primary text-white">
                <CardTitle>Why Virtual Garden?</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-garden-light flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-garden-primary" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Accessibility:</strong> Makes rare and geographically restricted plants available to everyone worldwide.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-garden-light flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-garden-primary" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Conservation:</strong> Documents and preserves knowledge about medicinal plants, some of which are endangered.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-garden-light flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-garden-primary" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Education:</strong> Provides interactive learning experiences that transcend seasonal limitations.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-garden-light flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-garden-primary" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Integration:</strong> Combines traditional knowledge with modern technology and scientific research.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-garden-light">
              <CardHeader className="bg-garden-primary text-white">
                <CardTitle>Features & Benefits</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-garden-light flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-garden-primary" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Interactive 3D Models:</strong> Examine plants from all angles for better understanding.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-garden-light flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-garden-primary" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Comprehensive Information:</strong> Detailed botanical, medicinal, and cultivation knowledge.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-garden-light flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-garden-primary" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Multi-system Integration:</strong> Learn how the same plant is used across different AYUSH systems.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-garden-light flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-garden-primary" />
                    </div>
                    <p className="text-gray-700">
                      <strong>Search & Filter:</strong> Easily find plants based on therapeutic properties or systems.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
