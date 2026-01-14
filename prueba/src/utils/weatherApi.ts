import axios from 'axios';
import type { WeatherData } from '../types';

const COLOMBIAN_CITIES = {
  bogota: { lat: 4.7110, lon: -74.0721, name: 'Bogotá' },
  medellin: { lat: 6.2442, lon: -75.5731, name: 'Medellín' },
  cali: { lat: 3.4372, lon: -76.5197, name: 'Cali' },
  barranquilla: { lat: 10.9639, lon: -74.7964, name: 'Barranquilla' },
  pasto: { lat: 1.2147, lon: -77.2811, name: 'Pasto' },
  cartagena: { lat: 10.3932, lon: -75.5085, name: 'Cartagena' },
  santa_marta: { lat: 11.2404, lon: -74.2247, name: 'Santa Marta' },
  bucaramanga: { lat: 7.119, lon: -73.1245, name: 'Bucaramanga' },
};

export async function getWeatherData(cityKey: keyof typeof COLOMBIAN_CITIES): Promise<WeatherData> {
  try {
    const city = COLOMBIAN_CITIES[cityKey];
    
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: city.lat,
        longitude: city.lon,
        current: 'temperature_2m,weather_code',
        timezone: 'America/Bogota',
      },
    });

    const current = response.data.current;
    const weatherCode = current.weather_code;
    
    let condition = 'Clear';
    let icon = '☀️';
    
    if (weatherCode === 0) {
      condition = 'Clear Sky';
      icon = '☀️';
    } else if (weatherCode === 1 || weatherCode === 2) {
      condition = 'Partly Cloudy';
      icon = '🌤️';
    } else if (weatherCode === 3) {
      condition = 'Cloudy';
      icon = '☁️';
    } else if ((weatherCode >= 45 && weatherCode <= 48) || (weatherCode >= 80 && weatherCode <= 82)) {
      condition = 'Rainy';
      icon = '🌧️';
    } else if (weatherCode >= 80 && weatherCode <= 82) {
      condition = 'Rain Showers';
      icon = '🌧️';
    } else if (weatherCode >= 85 && weatherCode <= 86) {
      condition = 'Snow Showers';
      icon = '❄️';
    } else if (weatherCode >= 80 && weatherCode <= 99) {
      condition = 'Thunderstorm';
      icon = '⛈️';
    }

    return {
      city: city.name,
      temperature: Math.round(current.temperature_2m),
      condition,
      icon,
      latitude: city.lat,
      longitude: city.lon,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

export function getRandomCity(): keyof typeof COLOMBIAN_CITIES {
  const cities = Object.keys(COLOMBIAN_CITIES) as (keyof typeof COLOMBIAN_CITIES)[];
  return cities[Math.floor(Math.random() * cities.length)];
}

export function getAllCities() {
  return Object.entries(COLOMBIAN_CITIES).map(([key, data]) => ({
    key,
    ...data,
  }));
}
