
import { WeatherData, ForecastData, ForecastItem } from '@/types/weather';

// For educational purposes only - in a real app, this would be in an environment variable
const API_KEY = "demo-api-key";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchCurrentWeather(city: string, units: string = 'metric'): Promise<WeatherData> {
  try {
    // In a real application, this would use the actual API
    // For demo purposes, we'll return mock data
    console.log(`Fetching current weather for ${city}`);
    
    // Mock response based on city name to demonstrate different conditions
    return getMockCurrentWeather(city);
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw new Error("Failed to fetch weather data");
  }
}

export async function fetchForecast(city: string, units: string = 'metric'): Promise<ForecastData> {
  try {
    console.log(`Fetching forecast for ${city}`);
    
    // Mock response for demo purposes
    return getMockForecast(city);
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw new Error("Failed to fetch forecast data");
  }
}

// Returns weather data based on city name to simulate different conditions
function getMockCurrentWeather(city: string): WeatherData {
  const lowerCity = city.toLowerCase();
  
  // Different mock data based on first letter to simulate variety
  const firstChar = lowerCity.charAt(0);
  
  if (['a', 'b', 'c'].includes(firstChar)) {
    // Sunny condition
    return {
      weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      main: {
        temp: 25.4,
        feels_like: 24.9,
        temp_min: 23.1,
        temp_max: 27.2,
        pressure: 1012,
        humidity: 45
      },
      wind: { speed: 3.1, deg: 240 },
      name: city,
      dt: Date.now() / 1000
    };
  } else if (['d', 'e', 'f'].includes(firstChar)) {
    // Cloudy condition
    return {
      weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }],
      main: {
        temp: 20.5,
        feels_like: 20.1,
        temp_min: 19.2,
        temp_max: 21.8,
        pressure: 1010,
        humidity: 65
      },
      wind: { speed: 5.2, deg: 180 },
      name: city,
      dt: Date.now() / 1000
    };
  } else if (['g', 'h', 'i'].includes(firstChar)) {
    // Rainy condition
    return {
      weather: [{ id: 501, main: "Rain", description: "moderate rain", icon: "10d" }],
      main: {
        temp: 16.8,
        feels_like: 16.5,
        temp_min: 15.4,
        temp_max: 17.9,
        pressure: 1008,
        humidity: 82
      },
      wind: { speed: 6.7, deg: 200 },
      name: city,
      dt: Date.now() / 1000
    };
  } else {
    // Default: Partly cloudy
    return {
      weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }],
      main: {
        temp: 22.7,
        feels_like: 22.5,
        temp_min: 21.3,
        temp_max: 23.9,
        pressure: 1013,
        humidity: 58
      },
      wind: { speed: 4.3, deg: 220 },
      name: city,
      dt: Date.now() / 1000
    };
  }
}

// Mock forecast data generator
function getMockForecast(city: string): ForecastData {
  const lowerCity = city.toLowerCase();
  const firstChar = lowerCity.charAt(0);
  const forecastList: ForecastItem[] = [];
  
  // Generate 5 days worth of forecast data
  const now = new Date();
  
  for (let i = 0; i < 5; i++) {
    const forecastDate = new Date();
    forecastDate.setDate(now.getDate() + i);
    
    // Mix up the conditions based on the day to make the forecast varied
    let condition: any;
    
    if (i % 5 === 0) {
      condition = { id: 800, main: "Clear", description: "clear sky", icon: "01d" };
    } else if (i % 5 === 1) {
      condition = { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" };
    } else if (i % 5 === 2) {
      condition = { id: 501, main: "Rain", description: "moderate rain", icon: "10d" };
    } else if (i % 5 === 3) {
      condition = { id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" };
    } else {
      condition = { id: 721, main: "Haze", description: "haze", icon: "50d" };
    }
    
    // Add random variations to temperature
    const baseTemp = ['a', 'b', 'c'].includes(firstChar) ? 25 : 
                     ['d', 'e', 'f'].includes(firstChar) ? 20 :
                     ['g', 'h', 'i'].includes(firstChar) ? 16 : 22;
    
    const variation = Math.random() * 5 - 2.5; // Random variation between -2.5 and 2.5
    
    forecastList.push({
      dt: forecastDate.getTime() / 1000,
      main: {
        temp: baseTemp + variation,
        feels_like: baseTemp + variation - 0.5,
        temp_min: baseTemp + variation - 2,
        temp_max: baseTemp + variation + 2,
        pressure: 1010 + Math.floor(Math.random() * 10),
        humidity: 50 + Math.floor(Math.random() * 40)
      },
      weather: [condition],
      wind: {
        speed: 2 + Math.random() * 8,
        deg: Math.floor(Math.random() * 360)
      },
      dt_txt: forecastDate.toISOString()
    });
  }
  
  return {
    list: forecastList,
    city: {
      name: city,
      country: "Demo"
    }
  };
}
