
import { WeatherData } from '@/types/weather';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Cloud, Droplets, Sun, Wind, CloudRain, Snowflake, CloudFog } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
}

export function WeatherCard({ data }: WeatherCardProps) {
  const { main, weather, wind } = data;
  const mainWeather = weather[0];
  
  // Format temperature to 1 decimal place
  const formatTemp = (temp: number) => `${temp.toFixed(1)}°C`;
  
  // Get appropriate icon based on weather condition
  const getWeatherIcon = () => {
    const iconCode = mainWeather.icon;
    
    // Based on OpenWeatherMap icon codes
    if (iconCode.includes('01')) return <Sun size={48} className="text-yellow-500" />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
      return <Cloud size={48} className="text-gray-500" />;
    if (iconCode.includes('09') || iconCode.includes('10')) 
      return <CloudRain size={48} className="text-blue-500" />;
    if (iconCode.includes('11')) 
      return <CloudRain size={48} className="text-purple-500" />;
    if (iconCode.includes('13')) 
      return <Snowflake size={48} className="text-blue-300" />;
    if (iconCode.includes('50')) 
      return <CloudFog size={48} className="text-gray-400" />;
      
    return <Cloud size={48} className="text-gray-500" />;
  };
  
  // Get background class based on weather condition
  const getBackgroundClass = () => {
    const iconCode = mainWeather.icon;
    
    if (iconCode.includes('01')) return "bg-gradient-to-br from-yellow-50 to-blue-50";
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
      return "bg-gradient-to-br from-gray-50 to-blue-50"; 
    if (iconCode.includes('09') || iconCode.includes('10')) 
      return "bg-gradient-to-br from-blue-50 to-gray-100";
    if (iconCode.includes('11')) 
      return "bg-gradient-to-br from-purple-50 to-gray-200";
    if (iconCode.includes('13')) 
      return "bg-gradient-to-br from-blue-50 to-gray-50";
    if (iconCode.includes('50')) 
      return "bg-gradient-to-br from-gray-50 to-gray-200";
      
    return "bg-gradient-to-br from-blue-50 to-white";
  };
  
  // Get wind direction as text
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };
  
  return (
    <Card className={`overflow-hidden shadow-lg ${getBackgroundClass()}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">{data.name}</h2>
            <p className="text-lg text-gray-600">{new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          </div>
          {getWeatherIcon()}
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <span className="text-6xl font-bold">{formatTemp(main.temp)}</span>
          </div>
          <p className="text-center text-lg capitalize text-gray-700">{mainWeather.description}</p>
          <p className="text-center text-gray-600">
            Feels like {formatTemp(main.feels_like)}
          </p>
        </div>
        
        <Separator className="my-4 bg-gray-200" />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Droplets className="mr-2 h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Humidity</p>
              <p className="font-medium">{main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <Wind className="mr-2 h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Wind</p>
              <p className="font-medium">{wind.speed.toFixed(1)} m/s ({getWindDirection(wind.deg)})</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Min</p>
            <p className="font-medium">{formatTemp(main.temp_min)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Max</p>
            <p className="font-medium">{formatTemp(main.temp_max)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pressure</p>
            <p className="font-medium">{main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
