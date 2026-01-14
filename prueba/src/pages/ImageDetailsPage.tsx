import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ImageDetailsPage.css';

interface CarouselImage {
  id: string;
  url: string;
  redirectUrl: string;
}

export function ImageDetailsPage() {
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const images = location.state?.images as CarouselImage[] || [];
  const initialIndex = parseInt(index || '0');
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setCurrentIndex(parseInt(index || '0'));
  }, [index]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFullscreen, images]);

  const handleBack = () => navigate('/');

  const handleNext = () => {
    if (images.length > 0) {
      const newIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(newIndex);
      navigate(`/image/${newIndex}`, { state: { images }, replace: true });
    }
  };

  const handlePrev = () => {
    if (images.length > 0) {
      const newIndex = (currentIndex - 1 + images.length) % images.length;
      setCurrentIndex(newIndex);
      navigate(`/image/${newIndex}`, { state: { images }, replace: true });
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const currentImage = images[currentIndex];

  if (!currentImage || images.length === 0) {
    return (
      <div className="image-details-page">
        <button className="back-btn" onClick={handleBack}>← Volver</button>
        <div className="error-state">
          <h2>⚠️ Error</h2>
          <p>No se encontró la imagen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`image-details-page ${isFullscreen ? 'fullscreen' : ''}`}>
      <button className="back-btn" onClick={handleBack}>← Volver</button>
      
      <div className="image-details-container">
        <div className="image-header">
          <h1>Imagen {currentIndex + 1} de {images.length}</h1>
          <button className="fullscreen-btn" onClick={toggleFullscreen}>
            {isFullscreen ? '🗙 Salir de pantalla completa' : '⛶ Pantalla completa'}
          </button>
        </div>

        <div className="image-viewer">
          {images.length > 1 && (
            <>
              <button className="nav-arrow prev-arrow" onClick={handlePrev} title="Anterior">
                ‹
              </button>
              <button className="nav-arrow next-arrow" onClick={handleNext} title="Siguiente">
                ›
              </button>
            </>
          )}
          
          <img 
            src={currentImage.url} 
            alt={`Imagen ${currentIndex + 1}`}
            className="full-image"
          />
        </div>

        {images.length > 1 && (
          <div className="carousel-thumbnails-viewer">
            {images.map((image, index) => (
              <button
                key={image.id}
                className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setCurrentIndex(index);
                  navigate(`/image/${index}`, { state: { images }, replace: true });
                }}
                title={`Imagen ${index + 1}`}
              >
                <img src={image.url} alt={`Miniatura ${index + 1}`} />
                <div className="thumbnail-overlay">{index + 1}</div>
              </button>
            ))}
          </div>
        )}

        <div className="image-info">
          <p>Usa las flechas o teclas ← → para navegar entre imágenes</p>
          <p>Haz clic en "Pantalla completa" para ver en modo inmersivo</p>
        </div>
      </div>
    </div>
  );
}
