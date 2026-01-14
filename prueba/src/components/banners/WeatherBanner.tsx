import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWeatherData, getAllCities } from '../../utils/weatherApi';
import type { WeatherData } from '../../types';
import './WeatherBanner.css';

interface WeatherBannerProps {
  size: '300x250' | '300x600';
  redirectUrl: string;
  cityKey?: string;
}

export function WeatherBanner({ size, redirectUrl, cityKey }: WeatherBannerProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCityKey, setSelectedCityKey] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      if (cityKey) {
        const key = cityKey as any;
        const data = await getWeatherData(key);
        setWeather(data);
        setSelectedCityKey(key);
      } else {
        const cities = getAllCities();
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const data = await getWeatherData(randomCity.key as any);
        setWeather(data);
        setSelectedCityKey(randomCity.key);
      }
      setError(null);
    } catch (err) {
      setError('Error cargando el clima');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedCityKey) {
      navigate(`/weather/${selectedCityKey}`);
      return;
    }
    window.open(redirectUrl, '_blank');
  };

  const sizeClass = size === '300x250' ? 'size-250' : 'size-600';

  return (
    <div className={`weather-banner ${sizeClass}`} onClick={handleClick}>
      {loading && <div className="loading">Cargando...</div>}
      
      {error && <div className="error">{error}</div>}

      {weather && (
        <div className="weather-content">
          <div className="weather-header">
            <h4>Clima en {weather.city}</h4>
            <button
              className="refresh-btn"
              onClick={(e) => {
                e.stopPropagation();
                fetchWeather();
              }}
              title="Actualizar"
            >
              🔄
            </button>
          </div>

          <div className="weather-main">
            <div className="weather-icon">{weather.icon}</div>
            <div className="weather-temp">
              <span className="temp-value">{weather.temperature}°C</span>
              <span className="temp-unit">Celsius</span>
            </div>
          </div>

          <div className="weather-condition">
            <p>{weather.condition}</p>
          </div>

          <div className="weather-cta">
            <button className="cta-button" onClick={handleClick}>
              Ver más
            </button>
          </div>

          {size === '300x600' && (
            <div className="weather-extra">
              <div className="extra-info">
                <div className="info-item">
                  <span className="label">Latitud</span>
                  <span className="value">{weather.latitude.toFixed(2)}</span>
                </div>
                <div className="info-item">
                  <span className="label">Longitud</span>
                  <span className="value">{weather.longitude.toFixed(2)}</span>
                </div>
              </div>
              <div className="weather-brand">
                <p>Alimentado por datos meteorológicos en tiempo real</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
