import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { globalEventTracker } from '../../utils/eventTracker';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  id: string;
  url: string;
  redirectUrl: string;
}

interface InstagramCarouselBannerProps {
  images: CarouselImage[];
  title: string;
}

export function InstagramCarouselBanner({ images, title }: InstagramCarouselBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({
    totalInteractions: 0,
    nextSlideCount: 0,
    prevSlideCount: 0,
    imageClicksByIndex: {} as Record<number, number>,
  });
  const [showStats, setShowStats] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    updateStats();
  }, []);

  const updateStats = () => {
    const newStats = globalEventTracker.getCarouselStats();
    console.log('📊 Updating stats:', newStats);
    setStats(newStats);
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % images.length;
    console.log('🔵 Next Slide clicked - Current index:', currentIndex, '-> New index:', newIndex);
    globalEventTracker.trackCarouselInteraction('nextSlide', currentIndex);
    console.log('📊 After tracking nextSlide, stats:', globalEventTracker.getCarouselStats());
    setCurrentIndex(newIndex);
    updateStats();
  };

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    console.log('🔵 Prev Slide clicked - Current index:', currentIndex, '-> New index:', newIndex);
    globalEventTracker.trackCarouselInteraction('prevSlide', currentIndex);
    console.log('📊 After tracking prevSlide, stats:', globalEventTracker.getCarouselStats());
    setCurrentIndex(newIndex);
    updateStats();
  };

  const handleImageClick = (e: React.MouseEvent, index: number, imageUrl: string) => {
    e.stopPropagation();
    globalEventTracker.trackCarouselInteraction('imageClick', index);
    updateStats();
    navigate(`/image/${index}`, { state: { imageUrl, images } });
  };

  const handleThumbnailClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    globalEventTracker.trackCarouselInteraction('imageClick', index);
    setCurrentIndex(index);
    updateStats();
  };

  const currentImage = images[currentIndex];

  return (
    <div className="flex justify-center items-center min-h-[600px] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-8 rounded-2xl">
      <Card className="w-full max-w-2xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {currentIndex + 1} / {images.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative">
            <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
              <img
                src={currentImage.url}
                alt={`Slide ${currentIndex + 1}`}
                onClick={(e) => handleImageClick(e, currentIndex, currentImage.url)}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </div>

            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 shadow-lg hover:scale-110 transition-transform"
                  onClick={handlePrevSlide}
                  title="Anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 shadow-lg hover:scale-110 transition-transform"
                  onClick={handleNextSlide}
                  title="Siguiente"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 p-6 justify-center bg-gradient-to-r from-slate-50 to-slate-100">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-4 ring-purple-500 scale-110 shadow-lg'
                      : 'ring-2 ring-slate-300 hover:ring-purple-300 hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                  onClick={(e) => handleThumbnailClick(e, index)}
                  title={`Imagen ${index + 1}`}
                >
                  <img src={image.url} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="p-6 bg-white">
            <Button
              variant="outline"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                setShowStats(!showStats);
              }}
            >
              {showStats ? '📊 Ocultar Estadísticas' : '📊 Ver Estadísticas'}
            </Button>

            {showStats && (
              <div className="mt-4 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg space-y-3">
                <h4 className="text-lg font-bold text-slate-800 mb-4">📈 Interacciones del Carrusel</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-slate-700">Total de interacciones:</span>
                    <Badge variant="default" className="text-base">{stats.totalInteractions}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-slate-700">Clics en siguiente:</span>
                    <Badge variant="secondary" className="text-base">{stats.nextSlideCount}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-slate-700">Clics en anterior:</span>
                    <Badge variant="secondary" className="text-base">{stats.prevSlideCount}</Badge>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <span className="text-sm font-medium text-slate-700 block mb-3">Clics por imagen:</span>
                    <div className="space-y-2 ml-4">
                      {Object.entries(stats.imageClicksByIndex).map(([index, count]) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Imagen {parseInt(index) + 1}:</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
