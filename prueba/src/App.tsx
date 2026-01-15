import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FacebookVideoBanner } from './components/banners/FacebookVideoBanner';
import { InstagramCarouselBanner } from './components/banners/InstagramCarouselBanner';
import { WeatherBanner } from './components/banners/WeatherBanner';
import { DynamicBanner } from './components/banners/DynamicBanner';
import { BannerDetailsPage } from './pages/BannerDetailsPage';
import { WeatherDetailsPage } from './pages/WeatherDetailsPage';
import { ImageDetailsPage } from './pages/ImageDetailsPage';
import { globalEventTracker } from './utils/eventTracker';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';

function AppContent() {
  const [showStats, setShowStats] = useState(false);

  const carouselImages = [
    {
      id: '1',
      url: '/carrucel-images/image1.png',
      redirectUrl: 'https://example.com/product-1',
    },
    {
      id: '2',
      url: '/carrucel-images/image2.png',
      redirectUrl: 'https://example.com/product-2',
    },
    {
      id: '3',
      url: '/carrucel-images/image3.png',
      redirectUrl: 'https://example.com/product-3',
    },
    {
      id: '4',
      url: '/carrucel-images/image4.png',
      redirectUrl: 'https://example.com/product-4',
    },
  ];

  const handleResetStats = () => {
    globalEventTracker.resetVideoInteractions();
    globalEventTracker.resetCarouselInteractions();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">🎯 Prueba Técnica - Banners Dinámicos</h1>
              <p className="text-blue-100 text-lg">Solución completa de banners interactivos con React</p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowStats(!showStats)}
              className="font-semibold"
            >
              {showStats ? '📊 Ocultar' : '📊 Ver'} Estadísticas
            </Button>
          </div>
        </div>
      </header>

      {showStats && (
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📹 Estadísticas de Video
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StatsDisplay stats={globalEventTracker.getVideoStats()} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🎠 Estadísticas de Carrusel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <StatsDisplay stats={globalEventTracker.getCarouselStats()} />
                </CardContent>
              </Card>
            </div>
            <Button onClick={handleResetStats} variant="destructive" className="w-full md:w-auto">
              🔄 Reiniciar Estadísticas
            </Button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-12 space-y-16">
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              1️⃣ Facebook – Video Post
            </h2>
            <p className="text-slate-600 text-lg">
              Banner con video interactivo. Los controles del video registran eventos sin redirigir.
            </p>
          </div>
          <FacebookVideoBanner
            title="Mira nuestro último video"
            videoUrl="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
            redirectUrl="https://youtube.com/watch?v=5Q06vH4Ft10"
          />
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              2️⃣ Instagram – Carousel Post
            </h2>
            <p className="text-slate-600 text-lg">
              Carrusel interactivo con navegación y seguimiento de clics por imagen.
            </p>
          </div>
          <InstagramCarouselBanner
            title="Nuestra Colección"
            images={carouselImages}
          />
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              3️⃣ Weather Banner
            </h2>
            <p className="text-slate-600 text-lg">
              Banners responsivos (300x250 y 300x600) con datos de clima en tiempo real de ciudades colombianas.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 text-center">Bogotá</h3>
              <WeatherBanner
                size="300x250"
                redirectUrl="/"
                cityKey="bogota"
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 text-center">Medellín</h3>
              <WeatherBanner
                size="300x250"
                redirectUrl="/"
                cityKey="medellin"
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 text-center">Barranquilla</h3>
              <WeatherBanner
                size="300x250"
                redirectUrl="/"
                cityKey="barranquilla"
              />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 text-center">Pasto</h3>
              <WeatherBanner
                size="300x250"
                redirectUrl="/"
                cityKey="pasto"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
              4️⃣ Dynamic Banner
            </h2>
            <p className="text-slate-600 text-lg">
              Banner que se conecta a un endpoint y muestra contenido diferente en cada recarga.
              El servidor contiene 30 registros de contenido generado con IA.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DynamicBanner />
            <DynamicBanner />
            <DynamicBanner />
          </div>
        </section>
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center space-y-2">
          <p className="text-slate-600">
            💡 Cada interacción de usuario es registrada y puede visualizarse en las estadísticas.
          </p>
          <p className="text-slate-600">
            🚀 El servidor de Dynamic Banner corre en puerto 3001. Usa npm run dev:all para ejecutar ambos procesos.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface StatsObject {
  [key: string]: number | Record<number, number>;
}

function StatsDisplay({ stats }: { stats: StatsObject }) {
  return (
    <div className="space-y-2">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between py-2 border-b last:border-b-0">
          <span className="text-sm font-medium text-slate-700">
            {key.replace(/([A-Z])/g, ' $1').trim()}:
          </span>
          <Badge variant="secondary">
            {typeof value === 'object' ? JSON.stringify(value) : value}
          </Badge>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/banner/:id" element={<BannerDetailsPage />} />
        <Route path="/weather/:cityKey" element={<WeatherDetailsPage />} />
        <Route path="/image/:index" element={<ImageDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
