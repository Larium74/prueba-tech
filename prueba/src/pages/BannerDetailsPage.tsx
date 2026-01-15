import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { DynamicBannerContent } from '../types';
import '../pages/BannerDetailsPage.css';

export function BannerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<DynamicBannerContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api-deployed-t4o7.onrender.com/api/banner-content/${id}`);

        if (!response.ok) {
          throw new Error('Error al cargar los detalles');
        }

        const result = await response.json();
        setContent(result.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching details:', err);
        setError('No se pudieron cargar los detalles del contenido.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleCta = () => {
    if (content?.ctaUrl) {
      window.open(content.ctaUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <button className="back-btn" onClick={handleGoBack}>
          ← Volver
        </button>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="details-page">
        <button className="back-btn" onClick={handleGoBack}>
          ← Volver
        </button>
        <div className="error-state">
          <h2>⚠️ Error</h2>
          <p>{error || 'No se encontró el contenido'}</p>
          <button className="retry-btn" onClick={handleGoBack}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <button className="back-btn" onClick={handleGoBack}>
        ← Volver
      </button>

      <div className="details-container">
        <div className="details-header">
          <h1>{content.title}</h1>
          <div className="details-meta">
            <span className="content-id">ID: {content.id}</span>
          </div>
        </div>

        <div className="details-content">
          <div className="details-image">
            <img
              src={content.imageUrl}
              alt={content.title}
              style={{ backgroundColor: content.backgroundColor }}
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23e0e0e0" width="600" height="400"/%3E%3C/svg%3E';
              }}
            />
          </div>

          <div className="details-text">
            <div className="description-section">
              <h2>Descripción</h2>
              <p>{content.description}</p>
            </div>

            <div className="details-footer">
              <button className="cta-btn-large" onClick={handleCta}>
                {content.ctaText}
              </button>
            </div>
          </div>
        </div>

        <div className="details-info">
          <h3>Información del Contenido</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Título:</label>
              <span>{content.title}</span>
            </div>
            <div className="info-item">
              <label>ID:</label>
              <span>{content.id}</span>
            </div>
            <div className="info-item">
              <label>URL de Acción:</label>
              <span className="url-text">{content.ctaUrl}</span>
            </div>
            <div className="info-item">
              <label>Botón CTA:</label>
              <span>{content.ctaText}</span>
            </div>
            <div className="info-item">
              <label>URL de Imagen:</label>
              <span className="url-text">{content.imageUrl}</span>
            </div>
            <div className="info-item">
              <label>Color de Fondo:</label>
              <div className="color-preview" style={{ backgroundColor: content.backgroundColor }}>
                {content.backgroundColor}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
