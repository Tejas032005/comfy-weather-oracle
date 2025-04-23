
import { useState, useEffect } from 'react';
import { WeatherCard } from '@/components/WeatherCard';
import { ForecastCard } from '@/components/ForecastCard';
import { LocationSearch } from '@/components/LocationSearch';
import { fetchCurrentWeather, fetchForecast } from '@/utils/weatherApi';
import { WeatherData, ForecastData } from '@/types/weather';
import { Loader2 } from 'lucide-react';

export function WeatherDashboard() {
  const [location, setLocation] = useState<string>('London');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeatherData() {
      setLoading(true);
      setError(null);
      
      try {
        const [weather, forecast] = await Promise.all([
          fetchCurrentWeather(location),
          fetchForecast(location)
        ]);
        
        setWeatherData(weather);
        setForecastData(forecast);
      } catch (err) {
        console.error('Failed to load weather data:', err);
        setError('Failed to load weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    loadWeatherData();
  }, [location]);

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
  };
  
  // Background classes based on current weather
  const getBackgroundClass = () => {
    if (!weatherData || !weatherData.weather[0]) return 'bg-gradient-to-br from-blue-100 to-sky-100';
    
    const iconCode = weatherData.weather[0].icon;
    
    if (iconCode.includes('01')) return "bg-gradient-to-br from-yellow-100 to-blue-100";
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
      return "bg-gradient-to-br from-gray-100 to-blue-100"; 
    if (iconCode.includes('09') || iconCode.includes('10')) 
      return "bg-gradient-to-br from-blue-100 to-gray-200";
    if (iconCode.includes('11')) 
      return "bg-gradient-to-br from-purple-100 to-gray-300";
    if (iconCode.includes('13')) 
      return "bg-gradient-to-br from-blue-50 to-gray-100";
    if (iconCode.includes('50')) 
      return "bg-gradient-to-br from-gray-100 to-gray-200";
      
    return "bg-gradient-to-br from-blue-100 to-white";
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${getBackgroundClass()}`}>
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Weather Forecast
          </h1>
          <div className="flex justify-center">
            <LocationSearch onLocationSelect={handleLocationSelect} defaultLocation={location} />
          </div>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2">Loading weather data...</span>
          </div>
        ) : (
          <div>
            {weatherData && (
              <div className="mb-8">
                <WeatherCard data={weatherData} />
              </div>
            )}

            {forecastData && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-4">5-Day Forecast</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {forecastData.list.map((item, index) => (
                    <ForecastCard key={index} forecast={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
