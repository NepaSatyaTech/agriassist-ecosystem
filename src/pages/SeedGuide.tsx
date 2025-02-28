
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeedRecommendation from '@/components/SeedRecommendation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  Calculator, 
  Leaf, 
  BarChart2, 
  Droplets, 
  Thermometer, 
  Calendar, 
  Sun, 
  DollarSign, 
  ChevronDown,
  X,
  ArrowRight
} from 'lucide-react';

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
    seedRate: 25, // kg per acre
    germinationRate: 95, // percentage
    diseaseResistance: 'High',
    marketPrice: 150, // $ per kg
    availability: 'In Stock',
    supplier: 'AgriTech Seeds',
    bestPlantingMonths: ['April', 'May'],
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
    seedRate: 100, // kg per acre
    germinationRate: 92, // percentage
    diseaseResistance: 'Medium',
    marketPrice: 85, // $ per kg
    availability: 'In Stock',
    supplier: 'DroughtGuard Seeds',
    bestPlantingMonths: ['October', 'November'],
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
    seedRate: 80, // kg per acre
    germinationRate: 90, // percentage
    diseaseResistance: 'Medium',
    marketPrice: 120, // $ per kg
    availability: 'Limited Stock',
    supplier: 'Organic Farms Co.',
    bestPlantingMonths: ['May', 'June'],
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
    seedRate: 40, // kg per acre
    germinationRate: 88, // percentage
    diseaseResistance: 'High',
    marketPrice: 95, // $ per kg
    availability: 'In Stock',
    supplier: 'RiceGrow International',
    bestPlantingMonths: ['June', 'July'],
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
    seedRate: 0.5, // kg per acre
    germinationRate: 95, // percentage
    diseaseResistance: 'Very High',
    marketPrice: 550, // $ per kg
    availability: 'Limited Stock',
    supplier: 'VeggiePro Seeds',
    bestPlantingMonths: ['March', 'April'],
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
    seedRate: 1500, // kg per acre (seed potatoes)
    germinationRate: 98, // percentage
    diseaseResistance: 'Medium',
    marketPrice: 45, // $ per kg
    availability: 'In Stock',
    supplier: 'TuberTech Seeds',
    bestPlantingMonths: ['February', 'March'],
  },
];

// Market price history data (mock)
const priceHistoryData = [
  { month: 'Jan', price: 142 },
  { month: 'Feb', price: 145 },
  { month: 'Mar', price: 148 },
  { month: 'Apr', price: 152 },
  { month: 'May', price: 156 },
  { month: 'Jun', price: 150 },
  { month: 'Jul', price: 145 },
  { month: 'Aug', price: 142 },
  { month: 'Sep', price: 146 },
  { month: 'Oct', price: 148 },
  { month: 'Nov', price: 152 },
  { month: 'Dec', price: 155 },
];

const SeedGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedSoilType, setSelectedSoilType] = useState('All');
  const [selectedWaterNeeds, setSelectedWaterNeeds] = useState('All');
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [activeTab, setActiveTab] = useState('browse');
  const [showSeedModal, setShowSeedModal] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState<typeof mockSeeds[0] | null>(null);
  
  // Calculator state
  const [calculatorSeed, setCalculatorSeed] = useState('');
  const [fieldArea, setFieldArea] = useState('1');
  const [areaUnit, setAreaUnit] = useState('acre');
  const [seedQuantity, setSeedQuantity] = useState<number | null>(null);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const handleCalculate = () => {
    const seed = mockSeeds.find(s => s.id === calculatorSeed);
    if (seed && fieldArea) {
      const area = parseFloat(fieldArea);
      if (!isNaN(area) && area > 0) {
        // Convert to standard unit (acre) if needed
        const areaInAcres = areaUnit === 'hectare' ? area * 2.47105 : area;
        const quantity = seed.seedRate * areaInAcres;
        setSeedQuantity(quantity);
        setEstimatedCost(quantity * seed.marketPrice);
      }
    }
  };

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

  const openSeedDetails = (seed: typeof mockSeeds[0]) => {
    setSelectedSeed(seed);
    setShowSeedModal(true);
  };

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
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="browse">Browse Seeds</TabsTrigger>
                  <TabsTrigger value="calculator">Seed Calculator</TabsTrigger>
                  <TabsTrigger value="market">Market Prices</TabsTrigger>
                </TabsList>
                
                <TabsContent value="browse">
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
                </TabsContent>
                
                <TabsContent value="calculator" className="glass-card p-6">
                  <div className="max-w-2xl mx-auto">
                    <div className="flex items-center mb-6">
                      <Calculator className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">Seed Application Calculator</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="seed-type">Select Seed Type</Label>
                        <Select value={calculatorSeed} onValueChange={setCalculatorSeed}>
                          <SelectTrigger id="seed-type" className="mt-1">
                            <SelectValue placeholder="Choose a seed" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockSeeds.map(seed => (
                              <SelectItem key={seed.id} value={seed.id}>
                                {seed.name} ({seed.seedRate} kg/acre)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="field-area">Field Area</Label>
                        <div className="flex mt-1">
                          <Input 
                            id="field-area" 
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={fieldArea}
                            onChange={(e) => setFieldArea(e.target.value)}
                            className="rounded-r-none"
                          />
                          <Select value={areaUnit} onValueChange={setAreaUnit}>
                            <SelectTrigger className="w-[120px] rounded-l-none">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="acre">Acre</SelectItem>
                              <SelectItem value="hectare">Hectare</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button onClick={handleCalculate} className="w-full md:w-auto">
                        Calculate Seed Requirements
                      </Button>
                    </div>
                    
                    {seedQuantity !== null && calculatorSeed && (
                      <div className="mt-6 p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <h4 className="font-semibold text-lg mb-3">
                          Calculation Results
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Seed Type</p>
                            <p className="font-medium">
                              {mockSeeds.find(s => s.id === calculatorSeed)?.name}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Field Area</p>
                            <p className="font-medium">{fieldArea} {areaUnit}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Required Seed Quantity</p>
                            <p className="font-medium text-lg text-primary">
                              {seedQuantity.toFixed(2)} kg
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Cost</p>
                            <p className="font-medium text-lg text-primary">
                              ${estimatedCost?.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                          <p className="flex items-center">
                            <Leaf className="h-4 w-4 mr-1 text-green-500" />
                            Recommended planting depth: 1-2 inches
                          </p>
                          <p className="flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1 text-green-500" />
                            Best planting months: {mockSeeds.find(s => s.id === calculatorSeed)?.bestPlantingMonths.join(', ')}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="font-semibold mb-3">Common Seed Application Rates:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="flex justify-between">
                          <span>Wheat:</span> 
                          <span className="font-medium">100 kg per acre</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Rice:</span> 
                          <span className="font-medium">40 kg per acre</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Corn:</span> 
                          <span className="font-medium">25 kg per acre</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Soybeans:</span> 
                          <span className="font-medium">80 kg per acre</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="market" className="glass-card p-6">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center mb-6">
                      <BarChart2 className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">Current Market Prices</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="text-center mb-3">
                          <h4 className="text-lg font-medium">Trending Seeds</h4>
                        </div>
                        <ul className="space-y-3">
                          {mockSeeds.slice(0, 4).map(seed => (
                            <li key={seed.id} className="flex justify-between items-center">
                              <span>{seed.name}</span>
                              <span className="font-medium">${seed.marketPrice}/kg</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="text-center mb-3">
                          <h4 className="text-lg font-medium">Price Forecast</h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center">
                            <span>Corn (Next Month)</span>
                            <span className="font-medium text-green-500">+5%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Wheat (Next Month)</span>
                            <span className="font-medium text-red-500">-2%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Rice (Next Month)</span>
                            <span className="font-medium text-green-500">+3%</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Soybeans (Next Month)</span>
                            <span className="font-medium">0%</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="text-center mb-3">
                        <h4 className="text-lg font-medium">All Seed Prices</h4>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        <table className="w-full">
                          <thead className="sticky top-0 bg-white dark:bg-gray-900">
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left py-2 px-4">Seed Name</th>
                              <th className="text-center py-2 px-4">Price ($/kg)</th>
                              <th className="text-center py-2 px-4">Availability</th>
                              <th className="text-center py-2 px-4">Supplier</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockSeeds.map(seed => (
                              <tr key={seed.id} className="border-b border-gray-200 dark:border-gray-700">
                                <td className="py-2 px-4">{seed.name}</td>
                                <td className="text-center py-2 px-4">${seed.marketPrice}</td>
                                <td className="text-center py-2 px-4">
                                  <Badge 
                                    variant={seed.availability === "In Stock" ? "default" : "secondary"}
                                    className={seed.availability === "In Stock" ? "bg-green-500" : "bg-yellow-500"}
                                  >
                                    {seed.availability}
                                  </Badge>
                                </td>
                                <td className="text-center py-2 px-4">{seed.supplier}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        * Prices updated daily. Last update: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Filters section */}
        {showFilters && activeTab === 'browse' && (
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
        {activeTab === 'browse' && (
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
                    <div key={seed.id} onClick={() => openSeedDetails(seed)}>
                      <SeedRecommendation seed={seed} />
                    </div>
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
        )}
        
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
      
        {/* Seed Detail Modal */}
        {showSeedModal && selectedSeed && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedSeed.name}</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowSeedModal(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative rounded-xl overflow-hidden mb-6">
                      <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/60 rounded-full px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
                        {selectedSeed.matchScore}% Match
                      </div>
                      <img 
                        src={selectedSeed.image} 
                        alt={selectedSeed.name} 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge className="bg-primary">{selectedSeed.season}</Badge>
                      {selectedSeed.soilType.map(soil => (
                        <Badge key={soil} variant="outline">{soil}</Badge>
                      ))}
                      <Badge 
                        className={
                          selectedSeed.waterNeeds === 'Low' ? 'bg-blue-400' : 
                          selectedSeed.waterNeeds === 'Medium' ? 'bg-blue-500' : 'bg-blue-600'
                        }
                      >
                        {selectedSeed.waterNeeds} Water
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {selectedSeed.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Growth Period</p>
                          <p className="font-medium">{selectedSeed.growthPeriod}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Thermometer className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Ideal Temp</p>
                          <p className="font-medium">{selectedSeed.idealTemp}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <BarChart2 className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Yield Estimate</p>
                          <p className="font-medium">{selectedSeed.yieldEstimate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Sun className="h-5 w-5 text-primary mr-2" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Best Planting</p>
                          <p className="font-medium">{selectedSeed.bestPlantingMonths.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                          <DollarSign className="h-5 w-5 text-primary mr-2" />
                          Market Information
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
                            <p className="text-xl font-bold text-primary">${selectedSeed.marketPrice}/kg</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Availability</p>
                            <Badge 
                              variant={selectedSeed.availability === "In Stock" ? "default" : "secondary"}
                              className={selectedSeed.availability === "In Stock" ? "bg-green-500" : "bg-yellow-500 mt-1"}
                            >
                              {selectedSeed.availability}
                            </Badge>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Supplier</p>
                            <p className="font-medium">{selectedSeed.supplier}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Price Trend</p>
                            <p className="font-medium text-green-500">+5% (Last 30 days)</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <Button variant="outline" className="w-full" size="sm">
                            View Price History
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                          <Leaf className="h-5 w-5 text-primary mr-2" />
                          Seed Properties
                        </h4>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Germination Rate</span>
                              <span className="text-sm font-medium">{selectedSeed.germinationRate}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${selectedSeed.germinationRate}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-500 dark:text-gray-400">Disease Resistance</span>
                              <span className="text-sm font-medium">{selectedSeed.diseaseResistance}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ 
                                  width: 
                                    selectedSeed.diseaseResistance === 'Low' ? '25%' : 
                                    selectedSeed.diseaseResistance === 'Medium' ? '50%' : 
                                    selectedSeed.diseaseResistance === 'High' ? '75%' : '90%'
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                            <span>Seed Application Rate</span>
                            <span className="font-semibold">{selectedSeed.seedRate} kg/acre</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex gap-4">
                      <Button className="w-full">Add to Cart</Button>
                      <Button variant="outline" className="w-full">Calculate Needs</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SeedGuide;
