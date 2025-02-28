
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeedRecommendation from '@/components/SeedRecommendation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, ChevronDown } from 'lucide-react';

// Mock seed data
const mockSeeds = [
  {
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
  },
  {
    id: 'seed-2',
    name: 'Drought-Resistant Wheat',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    season: 'Winter',
    soilType: ['Clay', 'Loamy'],
    waterNeeds: 'Low' as const,
    growthPeriod: '120-150 days',
    idealTemp: '15-25°C',
    yieldEstimate: '4-6 tons/hectare',
    description: 'A hardy winter wheat variety that can thrive with minimal water, making it ideal for regions with limited rainfall or drought-prone areas.',
    matchScore: 88,
  },
  {
    id: 'seed-3',
    name: 'Organic Soybeans',
    image: 'https://images.unsplash.com/photo-1601264213001-453d53583573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    season: 'Spring',
    soilType: ['Loamy', 'Clayey'],
    waterNeeds: 'Medium' as const,
    growthPeriod: '80-110 days',
    idealTemp: '20-30°C',
    yieldEstimate: '2.5-3.5 tons/hectare',
    description: 'Non-GMO soybean variety perfect for organic farming operations. High in protein content and excellent nitrogen fixation for soil improvement.',
    matchScore: 85,
  },
  {
    id: 'seed-4',
    name: 'High-Yield Rice',
    image: 'https://images.unsplash.com/photo-1536632506336-963aef327d95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
    season: 'Summer',
    soilType: ['Clayey', 'Silt'],
    waterNeeds: 'High' as const,
    growthPeriod: '110-130 days',
    idealTemp: '22-32°C',
    yieldEstimate: '6-8 tons/hectare',
    description: 'A high-yielding rice variety developed for intensive cultivation systems with excellent resistance to common rice diseases.',
    matchScore: 78,
  },
  {
    id: 'seed-5',
    name: 'Disease-Resistant Tomato',
    image: 'https://images.unsplash.com/photo-1592924357228-9b33240a5c07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    season: 'Spring',
    soilType: ['Sandy Loam', 'Loamy'],
    waterNeeds: 'Medium' as const,
    growthPeriod: '60-80 days',
    idealTemp: '18-29°C',
    yieldEstimate: '40-60 tons/hectare',
    description: 'A tomato variety with excellent resistance to common diseases like early blight and fusarium wilt, perfect for both greenhouse and field production.',
    matchScore: 75,
  },
  {
    id: 'seed-6',
    name: 'Early Maturing Potatoes',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    season: 'Spring',
    soilType: ['Sandy', 'Loamy'],
    waterNeeds: 'Medium' as const,
    growthPeriod: '70-90 days',
    idealTemp: '15-25°C',
    yieldEstimate: '25-35 tons/hectare',
    description: 'An early-maturing potato variety that allows for quicker harvests and multiple cropping seasons, with good resistance to common potato diseases.',
    matchScore: 70,
  },
];

const SeedGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedSoilType, setSelectedSoilType] = useState('All');
  const [selectedWaterNeeds, setSelectedWaterNeeds] = useState('All');
  const [minMatchScore, setMinMatchScore] = useState(0);

  const filteredSeeds = mockSeeds.filter((seed) => {
    // Apply search filter
    if (searchTerm && !seed.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply season filter
    if (selectedSeason !== 'All' && seed.season !== selectedSeason) {
      return false;
    }
    
    // Apply soil type filter
    if (selectedSoilType !== 'All' && !seed.soilType.includes(selectedSoilType)) {
      return false;
    }
    
    // Apply water needs filter
    if (selectedWaterNeeds !== 'All' && seed.waterNeeds !== selectedWaterNeeds) {
      return false;
    }
    
    // Apply match score filter
    if (seed.matchScore < minMatchScore) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-transparent py-16">
          <div className="container mx-auto px-4 pt-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-green-100 dark:bg-green-900/30 rounded-full px-3 py-1 text-sm font-medium text-green-800 dark:text-green-300 mb-3">
                AI-Powered Recommendations
              </div>
              <h1 className="text-4xl font-bold mb-4">Seasonal Seed Guide</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Find the perfect seeds for your farm based on soil conditions, climate, and current season. Our AI engine analyzes multiple factors to recommend the best options for optimal yield.
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for seeds, crops, or varieties..."
                  className="pl-10 pr-10 py-6 text-base rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters section */}
        {showFilters && (
          <section className="py-6 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 animate-fade-in">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="season">Season</Label>
                  <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                    <SelectTrigger id="season" className="mt-1">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Seasons</SelectItem>
                      <SelectItem value="Spring">Spring</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                      <SelectItem value="Fall">Fall</SelectItem>
                      <SelectItem value="Winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="soil-type">Soil Type</Label>
                  <Select value={selectedSoilType} onValueChange={setSelectedSoilType}>
                    <SelectTrigger id="soil-type" className="mt-1">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Soil Types</SelectItem>
                      <SelectItem value="Sandy">Sandy</SelectItem>
                      <SelectItem value="Sandy Loam">Sandy Loam</SelectItem>
                      <SelectItem value="Loamy">Loamy</SelectItem>
                      <SelectItem value="Clayey">Clayey</SelectItem>
                      <SelectItem value="Silt">Silt</SelectItem>
                      <SelectItem value="Clay">Clay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="water-needs">Water Needs</Label>
                  <Select value={selectedWaterNeeds} onValueChange={setSelectedWaterNeeds}>
                    <SelectTrigger id="water-needs" className="mt-1">
                      <SelectValue placeholder="Select water needs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Water Needs</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="match-score">Minimum Match Score</Label>
                    <span className="text-sm text-gray-500">{minMatchScore}%</span>
                  </div>
                  <Slider
                    id="match-score"
                    className="mt-3"
                    value={[minMatchScore]}
                    onValueChange={(value) => setMinMatchScore(value[0])}
                    min={0}
                    max={100}
                    step={5}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Results section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">
                {filteredSeeds.length} Seed Recommendations
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-300 text-sm">Sort by:</span>
                <Select defaultValue="match">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Match Score</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="season">Season</SelectItem>
                    <SelectItem value="yield">Yield Estimate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {filteredSeeds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSeeds.map((seed) => (
                  <SeedRecommendation key={seed.id} seed={seed} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-10 text-center">
                <h3 className="text-xl font-semibold mb-2">No seeds found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Try adjusting your filters or search term to find more seed options.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSeason('All');
                    setSelectedSoilType('All');
                    setSelectedWaterNeeds('All');
                    setMinMatchScore(0);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
            
            {filteredSeeds.length > 0 && (
              <div className="mt-10 text-center">
                <Button variant="outline" size="lg">
                  Load More Seeds
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* AI recommendation section */}
        <section className="py-16 bg-green-50 dark:bg-green-950/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto glass-card p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 w-16 h-16 flex items-center justify-center mb-4">
                    <div className="rounded-full bg-green-500 w-8 h-8 flex items-center justify-center text-white font-semibold">
                      AI
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">AI Seed Advisor</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Answer a few questions to get personalized seed recommendations based on your specific farm conditions.
                  </p>
                </div>
                
                <div className="md:w-2/3 space-y-4">
                  <div>
                    <Label htmlFor="location">Where is your farm located?</Label>
                    <Input 
                      id="location" 
                      placeholder="City, State, or Country" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="farm-size">How large is your farm?</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="farm-size" className="mt-1">
                        <SelectValue placeholder="Select farm size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (Less than 5 acres)</SelectItem>
                        <SelectItem value="medium">Medium (5-50 acres)</SelectItem>
                        <SelectItem value="large">Large (50-500 acres)</SelectItem>
                        <SelectItem value="very-large">Very Large (500+ acres)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="purpose">Primary farming purpose</Label>
                    <Select defaultValue="commercial">
                      <SelectTrigger id="purpose" className="mt-1">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal/Home Garden</SelectItem>
                        <SelectItem value="commercial">Commercial Production</SelectItem>
                        <SelectItem value="organic">Organic Certification</SelectItem>
                        <SelectItem value="specialty">Specialty Crops</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">Get Personalized Recommendations</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeedGuide;
