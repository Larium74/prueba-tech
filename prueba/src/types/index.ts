export interface VideoInteractionEvent {
  type: 'play' | 'pause' | 'mute' | 'unmute' | 'volumeChange';
  timestamp: Date;
  value?: number;
}

export interface CarouselInteractionEvent {
  type: 'nextSlide' | 'prevSlide' | 'imageClick';
  imageIndex: number;
  timestamp: Date;
}

export interface DynamicBannerContent {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl: string;
  backgroundColor: string;
}

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
  latitude: number;
  longitude: number;
}

export interface EventTracker {
  videoInteractions: VideoInteractionEvent[];
  carouselInteractions: CarouselInteractionEvent[];
}
