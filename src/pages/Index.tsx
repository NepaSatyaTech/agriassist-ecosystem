
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/home/FeaturesSection';
import DashboardPreviewSection from '@/components/home/DashboardPreviewSection';
import AdditionalFeaturesSection from '@/components/home/AdditionalFeaturesSection';
import CTASection from '@/components/home/CTASection';
import SeedCalculator from '@/components/SeedCalculator';
import SeedMarketPrices from '@/components/SeedMarketPrices';
import DetailedSeedInfo from '@/components/DetailedSeedInfo';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Leaf, Calculator, BarChart2 } from 'lucide-react';

// Mock data for components
const weatherData = {
  location: 'Agriville',
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
  temperature: 24,
  weatherType: 'sunny' as const,
  humidity: 45,
  windSpeed: 8,
  precipitation: 0,
};

const mockSeedData = {
  id: 'seed-1',
  name: 'Premium Hybrid Corn',
  image: 'https://images.unsplash.com/photo-1551817958-c5b51e7b4a33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  season: 'Summer',
  soilType: ['Loamy', 'Sandy Loam'],
  waterNeeds: 'Medium' as const,
  growthPeriod: '90-120 days',
  idealTemp: '20-30°C',
  yieldEstimate: '8-10 tons/hectare',
  description: 'A high-yielding corn hybrid suitable for various soil types with excellent drought resistance and disease tolerance.',
  matchScore: 92,
};

const sensorData = {
  id: 'sensor-1',
  name: 'Soil Moisture',
  location: 'Field A, North',
  type: 'moisture' as const,
  value: 37,
  unit: '%',
  timestamp: new Date().toISOString(),
  batteryLevel: 84,
  signalStrength: 92,
  status: 'normal' as const,
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero section */}
      <Hero />
      
      {/* Features section */}
      <FeaturesSection />
      
      {/* Dashboard preview section */}
      <DashboardPreviewSection 
        weatherData={weatherData} 
        sensorData={sensorData} 
        seedData={mockSeedData} 
      />
      
      {/* Seed Information section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300 mb-3">
              Smart Seed Management
            </div>
            <h2 className="text-3xl font-bold mb-4">Complete Seed Information & Management</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our comprehensive seed management system provides all the information you need to make informed decisions about your crops.
            </p>
          </div>
          
          <Tabs defaultValue="calculator" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span>Seed Calculator</span>
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                <span>Detailed Seed Info</span>
              </TabsTrigger>
              <TabsTrigger value="market" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>Market Prices</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="calculator">
              <SeedCalculator />
            </TabsContent>
            
            <TabsContent value="info">
              <DetailedSeedInfo />
            </TabsContent>
            
            <TabsContent value="market">
              <SeedMarketPrices />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Additional features section */}
      <AdditionalFeaturesSection />
      
      {/* CTA Section */}
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default Index;
