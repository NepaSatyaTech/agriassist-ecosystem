
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WeatherWidget from '@/components/WeatherWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cloud, Search, Calendar, MapPin, ArrowRight } from 'lucide-react';

const Weather = () => {
  // Sample weather data
  const currentWeather = {
    location: 'Agritown, CA',
    date: 'Today, June 10',
    temperature: 28,
    weatherType: 'sunny' as const,
    humidity: 35,
    windSpeed: 8,
    precipitation: 0,
  };
  
  const forecastData = [
    {
      location: 'Agritown, CA',
      date: 'Tomorrow, June 11',
      temperature: 30,
      weatherType: 'sunny' as const,
      humidity: 40,
      windSpeed: 10,
      precipitation: 0,
    },
    {
      location: 'Agritown, CA',
      date: 'Wednesday, June 12',
      temperature: 24,
      weatherType: 'cloudy' as const,
      humidity: 55,
      windSpeed: 12,
      precipitation: 0,
    },
    {
      location: 'Agritown, CA',
      date: 'Thursday, June 13',
      temperature: 22,
      weatherType: 'rainy' as const,
      humidity: 75,
      windSpeed: 15,
      precipitation: 8.5,
    },
    {
      location: 'Agritown, CA',
      date: 'Friday, June 14',
      temperature: 25,
      weatherType: 'cloudy' as const,
      humidity: 60,
      windSpeed: 8,
      precipitation: 0,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 mb-3">
              <Cloud className="h-4 w-4" />
              <span>Weather Intelligence</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Agricultural Weather Forecast</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Access precise weather data optimized for agricultural planning and decision-making.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Location Search */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
              <div className="relative w-full md:w-96">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Enter location..."
                  className="pl-10"
                  defaultValue="Agritown, CA"
                />
              </div>
              <Button>
                <Search className="mr-2 h-4 w-4" /> Get Weather
              </Button>
            </div>
            
            {/* Weather Tabs */}
            <Tabs defaultValue="current" className="mb-12">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="forecast">Forecast</TabsTrigger>
                <TabsTrigger value="agricultural">Agricultural</TabsTrigger>
              </TabsList>
              
              <TabsContent value="current">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <WeatherWidget data={currentWeather} />
                  </div>
                  
                  <div className="md:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-semibold mb-4">Current Conditions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Feels Like</h4>
                        <p className="text-2xl font-bold">29°C</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Visibility</h4>
                        <p className="text-2xl font-bold">25 km</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Pressure</h4>
                        <p className="text-2xl font-bold">1013 hPa</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">UV Index</h4>
                        <p className="text-2xl font-bold">8 <span className="text-sm text-orange-500">(High)</span></p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sunrise</h4>
                        <p className="text-2xl font-bold">5:42 AM</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Sunset</h4>
                        <p className="text-2xl font-bold">8:15 PM</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                      <h4 className="font-medium mb-3">Weather Alert</h4>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Heat advisory in effect from 11 AM to 8 PM. Take precautions to prevent heat-related illness.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="forecast">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {forecastData.map((day, index) => (
                    <WeatherWidget key={index} data={day} />
                  ))}
                </div>
                
                <div className="glass-card p-6 mt-8">
                  <h3 className="text-xl font-semibold mb-4">Extended Forecast</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The 14-day extended forecast shows a warming trend with potential showers in 7-10 days.
                    This pattern is favorable for current growing conditions but may require irrigation adjustments.
                  </p>
                  <Button variant="outline">
                    View 14-Day Forecast <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="agricultural">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 glass-card p-6">
                    <h3 className="text-xl font-semibold mb-4">Growing Conditions</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Growing Degree Days (Base 10°C)</span>
                          <span className="text-sm font-medium">18 GDD</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Soil Temperature (10cm)</span>
                          <span className="text-sm font-medium">22°C</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Evapotranspiration</span>
                          <span className="text-sm font-medium">5.2 mm/day</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '52%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Crop Water Demand</span>
                          <span className="text-sm font-medium">High</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <label className="block text-sm font-medium mb-2">Select Crop Type</label>
                      <Select defaultValue="corn">
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="corn">Corn/Maize</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="soybean">Soybean</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-semibold mb-4">Agricultural Recommendations</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Irrigation Planning</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Based on current soil moisture levels and the 5-day forecast, irrigation is recommended within the next 48 hours. Expected water requirement: 15-20mm equivalent.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Pest & Disease Risk</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          Current temperature and humidity conditions indicate elevated risk for fungal pathogens. Consider preventative fungicide application before the forecasted rain on Thursday.
                        </p>
                        <div className="mt-2 flex gap-2">
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Powdery Mildew: Moderate Risk
                          </span>
                          <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                            Corn Leaf Blight: High Risk
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Field Operations</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          Optimal conditions for field operations in the coming days:
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr>
                                <th className="text-left font-medium">Day</th>
                                <th className="text-left font-medium">Spraying</th>
                                <th className="text-left font-medium">Fertilizing</th>
                                <th className="text-left font-medium">Harvesting</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-2">Today</td>
                                <td className="py-2 text-green-600">Excellent</td>
                                <td className="py-2 text-green-600">Good</td>
                                <td className="py-2 text-green-600">Excellent</td>
                              </tr>
                              <tr>
                                <td className="py-2">Tomorrow</td>
                                <td className="py-2 text-green-600">Good</td>
                                <td className="py-2 text-green-600">Excellent</td>
                                <td className="py-2 text-green-600">Good</td>
                              </tr>
                              <tr>
                                <td className="py-2">Wednesday</td>
                                <td className="py-2 text-yellow-600">Fair</td>
                                <td className="py-2 text-yellow-600">Fair</td>
                                <td className="py-2 text-yellow-600">Fair</td>
                              </tr>
                              <tr>
                                <td className="py-2">Thursday</td>
                                <td className="py-2 text-red-600">Poor</td>
                                <td className="py-2 text-red-600">Poor</td>
                                <td className="py-2 text-red-600">Poor</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Features Overview */}
            <div className="glass-card p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6">Agricultural Weather Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Hyperlocal Forecasts</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get field-level weather forecasts using high-resolution weather models that account for local topography and microclimates.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Growing Degree Days</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Track accumulated heat units to predict crop development stages, optimize planting times, and schedule harvests.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Spray Windows</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Identify optimal windows for applying fertilizers, herbicides, and pesticides based on wind, temperature, and precipitation forecasts.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Frost Alerts</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Receive advance notifications of potential frost or freeze events to protect sensitive crops and implement mitigation strategies.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Disease Modeling</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Predict disease pressure based on temperature, humidity, and leaf wetness conditions to optimize fungicide applications.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Irrigation Planning</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Calculate evapotranspiration rates and crop water needs based on weather conditions to optimize irrigation scheduling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Weather;
