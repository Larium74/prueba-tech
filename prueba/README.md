# Prueba Técnica - Banners Dinámicos

Solución completa de banners interactivos desarrollada con React, TypeScript y Node.js.

## Descripción del Proyecto

Este proyecto implementa 4 tipos de banners dinámicos e interactivos con sistema de tracking de eventos y análisis de interacciones de usuario. Desarrollado como prueba técnica para demostrar habilidades en desarrollo frontend, backend, APIs y seguimiento de métricas.

## Características Principales

### 1. Facebook - Video Post Banner
- Banner con video interactivo completamente funcional
- Controles nativos: play, pause, mute/unmute, control de volumen
- Clic en el banner redirige a URL externa
- **Sistema de tracking de eventos:**
  - Reproducciones (play count)
  - Pausas (pause count)
  - Silenciados (mute/unmute count)
  - Cambios de volumen
  - Total de interacciones
- Visualización de estadísticas en tiempo real

### 2. Instagram - Carousel Post Banner
- Carrusel interactivo con navegación por flechas
- Sistema de miniaturas clickeables
- Cada imagen redirige a URL específica
- Visualización fullscreen de imágenes con navegación
- **Sistema de tracking de eventos:**
  - Clics en flecha siguiente
  - Clics en flecha anterior
  - Clics por imagen individual
  - Total de interacciones del carrusel
- Diseño moderno con Tailwind CSS y degradados

### 3. Weather Banner
- Banners responsivos en múltiples tamaños (300x250, 300x600)
- Integración con **Open-Meteo API** para datos en tiempo real
- Ciudades colombianas implementadas:
  - Bogotá
  - Medellín
  - Barranquilla
  - Pasto
  - Cali
  - Cartagena
  - Santa Marta
  - Bucaramanga
- Muestra temperatura, condición climática y emoji
- Página de detalles con información completa
- Animaciones CSS suaves

### 4. Dynamic Banner
- Banner que consume endpoint REST propio
- **30 registros de contenido** único en el servidor
- Contenido aleatorio en cada carga
- Endpoint con múltiples temáticas:
  - Tecnología
  - Desarrollo web
  - Inteligencia artificial
  - Seguridad
  - DevOps
  - Y más...
- Página de detalles para cada contenido
- Diseño adaptativo con colores dinámicos

## Tecnologías Utilizadas

### Frontend
- **React** 19.2.0 - Framework principal
- **TypeScript** 5.9 - Type safety
- **Vite** 7.2.4 - Build tool y dev server
- **React Router** 6.20.0 - Navegación SPA
- **Tailwind CSS** 4.x - Estilos utility-first
- **shadcn/ui** - Sistema de componentes
- **Lucide React** - Iconos
- **Axios** 1.13.2 - Cliente HTTP

### Backend
- **Node.js** - Runtime
- **Express** 5.2.1 - Framework web
- **CORS** - Habilitado para desarrollo

### APIs Externas
- **Open-Meteo API** - Datos meteorológicos en tiempo real
- **Unsplash** - Imágenes de alta calidad

## Estructura del Proyecto

```
prueba/
├── src/
│   ├── components/
│   │   ├── banners/
│   │   │   ├── FacebookVideoBanner.tsx    # Banner de video
│   │   │   ├── InstagramCarouselBanner.tsx # Carrusel
│   │   │   ├── WeatherBanner.tsx          # Banner de clima
│   │   │   └── DynamicBanner.tsx          # Banner dinámico
│   │   └── ui/
│   │       ├── button.tsx                 # Componente Button
│   │       ├── card.tsx                   # Componente Card
│   │       └── badge.tsx                  # Componente Badge
│   ├── pages/
│   │   ├── BannerDetailsPage.tsx          # Detalles Dynamic Banner
│   │   ├── WeatherDetailsPage.tsx         # Detalles clima
│   │   └── ImageDetailsPage.tsx           # Visualizador fullscreen
│   ├── utils/
│   │   ├── eventTracker.ts                # Sistema de tracking
│   │   └── weatherApi.ts                  # Cliente API clima
│   ├── types/
│   │   └── index.ts                       # Tipos TypeScript
│   ├── lib/
│   │   └── utils.ts                       # Utilidades (cn function)
│   ├── App.tsx                            # Componente principal
│   ├── main.tsx                           # Entry point
│   └── index.css                          # Estilos globales
├── server/
│   └── index.js                           # API REST con Express
├── public/
│   └── carrucel-images/                   # Imágenes del carrusel
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+ instalado
- npm o yarn

### Paso 1: Clonar el repositorio
```bash
git clone <repository-url>
cd prueba-tech/prueba
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Iniciar el servidor backend
```bash
# En una terminal
cd server
node index.js
```

### Paso 4: Iniciar el frontend
```bash
npm run dev
```

### Alternativa: Ejecutar ambos simultáneamente
```bash
npm run dev:all
```

## Sistema de Tracking de Eventos

### EventTracker Class
Clase singleton que gestiona todos los eventos de interacción:

```typescript
import { globalEventTracker } from './utils/eventTracker';

globalEventTracker.trackVideoInteraction('play');

globalEventTracker.trackCarouselInteraction('nextSlide', imageIndex);

const videoStats = globalEventTracker.getVideoStats();
const carouselStats = globalEventTracker.getCarouselStats();

globalEventTracker.resetVideoInteractions();
globalEventTracker.resetCarouselInteractions();
```

### Eventos Trackeados

**Video Banner:**
- `play` - Reproducción del video
- `pause` - Pausa del video
- `mute` - Silenciar audio
- `unmute` - Activar audio
- `volumeChange` - Cambio de volumen

**Carousel Banner:**
- `nextSlide` - Clic en flecha siguiente
- `prevSlide` - Clic en flecha anterior
- `imageClick` - Clic en imagen específica (por índice)

## API Endpoints

### Backend Local (puerto 3001)

#### GET `/api/banner-content`
Obtiene un contenido aleatorio del Dynamic Banner
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Título del banner",
    "description": "Descripción...",
    "ctaText": "Texto del botón",
    "ctaUrl": "https://...",
    "imageUrl": "https://...",
    "backgroundColor": "#FF6B6B"
  },
  "timestamp": "2026-01-14T..."
}
```

#### GET `/api/banner-content/all`
Obtiene todos los 30 registros
```json
{
  "success": true,
  "data": [...],
  "count": 30,
  "timestamp": "2026-01-14T..."
}
```

#### GET `/api/banner-content/:id`
Obtiene un contenido específico por ID

#### GET `/api/health`
Health check del servidor

### API Externa - Open-Meteo
```
GET https://api.open-meteo.com/v1/forecast
  ?latitude={lat}
  &longitude={lon}
  &current=temperature_2m,weather_code
```

## Diseño y Estilos

### Tailwind CSS + shadcn/ui
El proyecto utiliza un sistema de diseño moderno y minimalista:

- **Degradados coloridos** para fondos y headers
- **Componentes reutilizables** con variantes
- **Animaciones suaves** con transitions
- **Responsive design** mobile-first
- **Dark mode ready** (variables CSS preparadas)

### Paleta de Colores
```css
--primary: 221.2 83.2% 53.3%     /* Azul primario */
--secondary: 210 40% 96.1%       /* Gris claro */
--destructive: 0 84.2% 60.2%     /* Rojo */
--muted: 210 40% 96.1%           /* Gris suave */
--accent: 210 40% 96.1%          /* Acento */
```

## Características Adicionales

### Navegación y Rutas
- `/` - Página principal con todos los banners
- `/banner/:id` - Detalles del Dynamic Banner
- `/weather/:cityKey` - Detalles del clima por ciudad
- `/image/:index` - Visualizador fullscreen de imágenes

### Visualizador de Imágenes
- Modo fullscreen
- Navegación con flechas (← →)
- Teclado: Flechas para navegar, ESC para salir
- Carrusel de miniaturas en la parte inferior
- Transiciones suaves

### Panel de Estadísticas Globales
- Botón en el header para mostrar/ocultar
- Estadísticas consolidadas de video y carrusel
- Botón para resetear todas las métricas
- Actualización en tiempo real

## Configuración de Desarrollo

### Scripts Disponibles
```json
{
  "dev": "vite",                    // Inicia frontend
  "build": "tsc -b && vite build",  // Compila para producción
  "preview": "vite preview",        // Preview del build
  "lint": "eslint .",               // Linter
  "dev:all": "concurrently ..."     // Frontend + Backend
}
```

### Variables de Entorno
No se requieren variables de entorno. Todas las APIs son públicas.

### Tailwind Configuration
```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // shadcn/ui color tokens
      }
    }
  }
}
```

## Build para Producción

```bash
npm run build
```

El build genera:
- `dist/index.html`
- `dist/assets/*.css` (~36 KB)
- `dist/assets/*.js` (~302 KB, ~98 KB gzipped)

## Testing

El proyecto incluye logs detallados en consola para debugging:
- Eventos de navegación del carrusel
- Actualizaciones de estadísticas
- Errores de API
- Llamadas a endpoints

## Cumplimiento de Requerimientos

### Facebook Video Post
- [x] Adaptado a HTML/React
- [x] Banner clickeable con redirección
- [x] Video interactivo sin redirección en controles
- [x] Medición de eventos (play, pause, mute, volume)
- [x] Visualización de interacciones

### Instagram Carousel
- [x] Banner con carrusel en HTML/React
- [x] Banner clickeable
- [x] Navegación izquierda/derecha
- [x] Cada imagen con URL distinta
- [x] Medición de clics en flechas
- [x] Medición de clics por imagen

### Weather Banner
- [x] Tamaños 300x250 y 300x600
- [x] Animaciones CSS/JS
- [x] API de clima conectada
- [x] Ciudades de Colombia
- [x] Texto + CTA + Diseño
- [x] Banner clickeable

### Dynamic Banner
- [x] Tamaño 300x250
- [x] Conectado a endpoint propio
- [x] Contenido diferente en cada carga
- [x] Animación + Texto + CTA
- [x] **30 registros** en endpoint
- [x] Contenido variado y realista

## Autor

Desarrollado como prueba técnica para demostrar competencias en:
- Desarrollo Frontend (React, TypeScript, Tailwind)
- Desarrollo Backend (Node.js, Express, REST APIs)
- Integración con APIs externas
- Sistema de tracking y analytics
- Diseño UI/UX moderno
- Arquitectura de componentes
- Type safety con TypeScript

## Licencia

Este proyecto es una prueba técnica y está disponible para revisión.

---

**Fecha de desarrollo:** Enero 2026  
**Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Node.js + Express  
**Estado:** Completado y listo para entrega
