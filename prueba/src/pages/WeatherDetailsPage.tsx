import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getWeatherData } from '../utils/weatherApi';
import type { WeatherData } from '../types';
import './WeatherDetailsPage.css';

export function WeatherDetailsPage() {
  const { cityKey } = useParams<{ cityKey: string }>();
  const navigate = useNavigate();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!cityKey) return;
      try {
        setLoading(true);
        const data = await getWeatherData(cityKey as any);
        setWeather(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather details:', err);
        setError('No se pudieron cargar los datos del clima.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [cityKey]);

  const handleBack = () => navigate('/');

  if (loading) {
    return (
      <div className="weather-details-page">
        <button className="back-btn" onClick={handleBack}>← Volver</button>
        <div className="loading-state">Cargando detalles del clima...</div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather-details-page">
        <button className="back-btn" onClick={handleBack}>← Volver</button>
        <div className="error-state">
          <h2>⚠️ Error</h2>
          <p>{error || 'No se encontraron datos.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-details-page">
      <button className="back-btn" onClick={handleBack}>← Volver</button>

      <div className="weather-details-container">
        <header className="weather-details-header">
          <h1>Clima en {weather.city}</h1>
          <div className="weather-summary">
            <div className="icon">{weather.icon}</div>
            <div className="temp">
              <span className="value">{weather.temperature}°C</span>
              <span className="unit">Celsius</span>
            </div>
            <div className="condition">{weather.condition}</div>
          </div>
        </header>

        <section className="weather-details-grid">
          <div className="card">
            <h3>Coordenadas</h3>
            <p>Latitud: {weather.latitude.toFixed(4)}</p>
            <p>Longitud: {weather.longitude.toFixed(4)}</p>
          </div>

          <div className="card">
            <h3>Pronóstico</h3>
            <p>Condición: {weather.condition}</p>
            <p>Temperatura: {weather.temperature}°C</p>
          </div>

          <div className="card">
            <h3>Fuente</h3>
            <p>Datos proporcionados por Open-Meteo</p>
          </div>
        </section>
      </div>
    </div>
  );
}
