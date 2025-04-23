
import { ForecastItem } from '@/types/weather';
import { Card } from '@/components/ui/card';
import { Cloud, Sun, CloudRain, Snowflake, CloudFog } from 'lucide-react';

interface ForecastCardProps {
  forecast: ForecastItem;
}

export function ForecastCard({ forecast }: ForecastCardProps) {
  const { main, weather, dt_txt } = forecast;
  const date = new Date(dt_txt);
  const mainWeather = weather[0];
  
  // Format temperature to whole number
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  
  // Get appropriate icon based on weather condition
  const getWeatherIcon = () => {
    const iconCode = mainWeather.icon;
    
    // Based on OpenWeatherMap icon codes
    if (iconCode.includes('01')) return <Sun size={24} className="text-yellow-500" />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
      return <Cloud size={24} className="text-gray-500" />;
    if (iconCode.includes('09') || iconCode.includes('10')) 
      return <CloudRain size={24} className="text-blue-500" />;
    if (iconCode.includes('13')) 
      return <Snowflake size={24} className="text-blue-300" />;
    if (iconCode.includes('50')) 
      return <CloudFog size={24} className="text-gray-400" />;
      
    return <Cloud size={24} className="text-gray-500" />;
  };
  
  // Get background class based on weather condition
  const getBackgroundClass = () => {
    const iconCode = mainWeather.icon;
    
    if (iconCode.includes('01')) return "bg-gradient-to-br from-yellow-50 to-blue-50";
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
      return "bg-gradient-to-br from-gray-50 to-blue-50"; 
    if (iconCode.includes('09') || iconCode.includes('10')) 
      return "bg-gradient-to-br from-blue-50 to-gray-100";
    if (iconCode.includes('13')) 
      return "bg-gradient-to-br from-blue-50 to-gray-50";
    if (iconCode.includes('50')) 
      return "bg-gradient-to-br from-gray-50 to-gray-200";
      
    return "bg-gradient-to-br from-blue-50 to-white";
  };
  
  return (
    <Card className={`overflow-hidden shadow ${getBackgroundClass()}`}>
      <div className="p-4 text-center">
        <p className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
        <div className="my-2 flex justify-center">
          {getWeatherIcon()}
        </div>
        <p className="text-xs text-gray-600 capitalize">{mainWeather.description}</p>
        <div className="mt-2 flex justify-center space-x-2">
          <span className="font-medium">{formatTemp(main.temp_max)}</span>
          <span className="text-gray-500">{formatTemp(main.temp_min)}</span>
        </div>
      </div>
    </Card>
  );
}
