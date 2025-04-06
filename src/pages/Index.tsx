
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedPlants from '@/components/home/FeaturedPlants';
import FeaturesSection from '@/components/home/FeaturesSection';
import AyushSystemsSection from '@/components/home/AyushSystemsSection';
import { plantsData } from '@/data/plants';

const Index = () => {
  // Select a few featured plants
  const featuredPlants = plantsData.slice(0, 4);
  
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <FeaturedPlants plants={featuredPlants} />
      <AyushSystemsSection />
    </Layout>
  );
};

export default Index;
