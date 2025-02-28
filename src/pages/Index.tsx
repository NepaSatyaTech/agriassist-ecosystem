
import React from 'react';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import WeatherWidget from '@/components/WeatherWidget';
import ExpenseChart from '@/components/ExpenseChart';
import SeedRecommendation from '@/components/SeedRecommendation';
import IoTSensorCard from '@/components/IoTSensorCard';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  BarChart3, 
  Brain, 
  Wifi, 
  Cloud, 
  Microscope, 
  LineChart, 
  Bell, 
  Bug, 
  Satellite, 
  MessagesSquare,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300 mb-3">
              Smart Features
            </div>
            <h2 className="text-3xl font-bold mb-4">Everything You Need For Smart Farming</h2>
            <p className="text-gray-600 dark:text-gray-300">
              AgriAssist combines cutting-edge technology with agricultural expertise to provide a comprehensive solution for modern farmers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/seed-guide">
              <FeatureCard 
                icon={Leaf}
                title="Seasonal Seed Guide"
                description="Get AI-powered recommendations for the best seeds based on your location, soil type, and current season."
                iconClassName="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              />
            </Link>
            
            <Link to="/expense-tracker">
              <FeatureCard 
                icon={BarChart3}
                title="Expense & Profit Tracker"
                description="Track all farm expenses and income, generate reports, and analyze profitability."
                iconClassName="bg-earth-100 text-earth-600 dark:bg-earth-900/30 dark:text-earth-400"
              />
            </Link>
            
            <FeatureCard 
              icon={Brain}
              title="AI Crop Suggestions"
              description="Leverage historical data and weather forecasts to determine optimal planting times and crop rotations."
              iconClassName="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
            />
            
            <Link to="/iot-monitoring">
              <FeatureCard 
                icon={Wifi}
                title="IoT Farm Monitoring"
                description="Connect IoT sensors to monitor soil moisture, temperature, humidity, and more in real-time."
                iconClassName="bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
              />
            </Link>
            
            <Link to="/weather">
              <FeatureCard 
                icon={Cloud}
                title="Weather Forecasting"
                description="Access accurate weather data and forecasts specifically tailored for agricultural planning."
                iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              />
            </Link>
            
            <FeatureCard 
              icon={Microscope}
              title="Soil Health Analyzer"
              description="Input soil test results and receive AI-based recommendations for improving soil health."
              iconClassName="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
            />
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group">
              Explore All Features
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Dashboard preview section */}
      <section className="py-24 bg-green-50 dark:bg-green-950/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300 mb-3">
              Live Dashboard
            </div>
            <h2 className="text-3xl font-bold mb-4">Everything at Your Fingertips</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your farm's performance, track expenses, check weather, and receive recommendations all in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ExpenseChart />
            </div>
            
            <div className="space-y-8">
              <WeatherWidget data={weatherData} />
              <IoTSensorCard data={sensorData} />
            </div>
            
            <div className="lg:col-span-3">
              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Recommended Seeds for This Season</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SeedRecommendation seed={mockSeedData} />
                  <SeedRecommendation seed={{
                    ...mockSeedData,
                    id: 'seed-2',
                    name: 'Drought-Resistant Wheat',
                    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    season: 'Winter',
                    soilType: ['Clay', 'Loamy'],
                    waterNeeds: 'Low' as const,
                    matchScore: 88,
                    description: 'A hardy winter wheat variety that can thrive with minimal water, making it ideal for regions with limited rainfall or drought-prone areas.'
                  }} />
                  <SeedRecommendation seed={{
                    ...mockSeedData,
                    id: 'seed-3',
                    name: 'Organic Soybeans',
                    image: 'https://images.unsplash.com/photo-1601264213001-453d53583573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    season: 'Spring',
                    soilType: ['Loamy', 'Clayey'],
                    waterNeeds: 'Medium' as const,
                    matchScore: 85,
                    description: 'Non-GMO soybean variety perfect for organic farming operations. High in protein content and excellent nitrogen fixation for soil improvement.'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Additional features section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300 mb-3">
                More Features
              </div>
              <h2 className="text-3xl font-bold mb-6">Advanced Tools for Modern Agriculture</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                AgriAssist provides a comprehensive suite of tools to help you optimize every aspect of your farming operation, from planning to harvest.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-1">Market Price Tracker</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Stay updated on crop prices across different markets to sell your produce at the most profitable rates.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-1">Automated Alerts & Reminders</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Receive timely notifications for irrigation, fertilization, pest control, and harvesting schedules.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Bug className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-1">Pest & Disease Detection</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Upload images of your plants and let our AI detect early signs of crop diseases or pest infestations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Satellite className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-1">Satellite & Drone Integration</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Utilize satellite imagery and drone monitoring for comprehensive aerial field analysis and crop health tracking.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MessagesSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold mb-1">Community Forum & Expert Advice</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Connect with other farmers, share experiences, and get guidance from agricultural experts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-sky-500/20 blur-xl rounded-2xl"></div>
              <div className="relative glass-card p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <img 
                      src="https://images.unsplash.com/photo-1585833622470-cc0845c7a615?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Drone monitoring" 
                      className="rounded-lg w-full h-48 object-cover"
                    />
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1559122998-808ac5ba14d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Crop disease detection" 
                      className="rounded-lg w-full h-32 object-cover"
                    />
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1494599948593-3dafe8338d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Market prices" 
                      className="rounded-lg w-full h-32 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of farmers who are already using AgriAssist to increase yields, reduce costs, and farm smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-green-700 hover:bg-green-50 border-white">
              Get Started for Free
            </Button>
            <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
