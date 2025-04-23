
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface WeatherData {
  weather: WeatherCondition[];
  main: CurrentWeather;
  wind: Wind;
  name: string;
  dt: number;
}

export interface ForecastItem {
  dt: number;
  main: CurrentWeather;
  weather: WeatherCondition[];
  wind: Wind;
  dt_txt: string;
}

export interface ForecastData {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}
