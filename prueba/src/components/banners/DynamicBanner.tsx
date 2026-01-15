import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DynamicBannerContent } from '../../types';
import './DynamicBanner.css';

interface DynamicBannerProps {
  apiUrl?: string;
}

export function DynamicBanner({ apiUrl = 'https://api-deployed-t4o7.onrender.com/api/banner-content' }: DynamicBannerProps) {
  const [content, setContent] = useState<DynamicBannerContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBannerContent();
  }, []);

  const fetchBannerContent = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      setContent(result.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching banner content:', err);
      setError('Error loading banner content. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleCtaClick = (e: React.MouseEvent, contentId: string) => {
    e.stopPropagation();
    navigate(`/banner/${contentId}`);
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchBannerContent();
  };

  return (
    <div className="dynamic-banner-wrapper">
      {loading && (
        <div className="dynamic-banner loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando contenido...</p>
        </div>
      )}

      {error && (
        <div className="dynamic-banner error-state">
          <p>⚠️ {error}</p>
          <button onClick={handleRefresh} className="retry-btn">
            Reintentar
          </button>
        </div>
      )}

      {content && (
        <div 
          className="dynamic-banner"
          style={{ backgroundColor: content.backgroundColor }}
        >
          <div className="banner-content">
            <div className="content-image">
              <img
                src={content.imageUrl}
                alt={content.title}
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250"%3E%3Crect fill="%23e0e0e0" width="400" height="250"/%3E%3C/svg%3E';
                }}
              />
            </div>

            <div className="content-text">
              <h3 className="content-title">{content.title}</h3>
              <p className="content-description">{content.description}</p>
            </div>

            <div className="content-cta">
              <button
                className="cta-btn"
                onClick={(e) => handleCtaClick(e, content.id)}
              >
                {content.ctaText}
              </button>
            </div>

            <button
              className="refresh-content-btn"
              onClick={handleRefresh}
              title="Cargar nuevo contenido"
            >
              🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
