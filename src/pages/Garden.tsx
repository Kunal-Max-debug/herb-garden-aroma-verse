
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PlantGrid from '@/components/plants/PlantGrid';
import { plantsData } from '@/data/plants';

const GardenPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-garden-dark mb-3">Virtual Herbal Garden</h1>
          <p className="text-gray-600 max-w-3xl">
            Explore our collection of medicinal plants used in traditional AYUSH healing systems. 
            Click on any plant to view detailed information, medicinal uses, and interactive 3D models.
          </p>
        </div>
        
        <PlantGrid plants={plantsData} />
      </div>
    </Layout>
  );
};

export default GardenPage;
