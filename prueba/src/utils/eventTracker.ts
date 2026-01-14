import type { VideoInteractionEvent, CarouselInteractionEvent } from '../types';

class EventTracker {
  private videoInteractions: VideoInteractionEvent[] = [];
  private carouselInteractions: CarouselInteractionEvent[] = [];

  trackVideoInteraction(type: VideoInteractionEvent['type'], value?: number) {
    this.videoInteractions.push({
      type,
      timestamp: new Date(),
      value,
    });
    console.log(`Video Event: ${type}`, { timestamp: new Date(), value });
  }

  trackCarouselInteraction(type: CarouselInteractionEvent['type'], imageIndex: number) {
    this.carouselInteractions.push({
      type,
      imageIndex,
      timestamp: new Date(),
    });
    console.log(`Carousel Event: ${type} - Image ${imageIndex}`, { timestamp: new Date() });
  }

  getVideoStats() {
    const stats = {
      totalInteractions: this.videoInteractions.length,
      playCount: this.videoInteractions.filter(e => e.type === 'play').length,
      pauseCount: this.videoInteractions.filter(e => e.type === 'pause').length,
      muteCount: this.videoInteractions.filter(e => e.type === 'mute').length,
      unmuteCount: this.videoInteractions.filter(e => e.type === 'unmute').length,
      volumeChanges: this.videoInteractions.filter(e => e.type === 'volumeChange').length,
    };
    return stats;
  }

  getCarouselStats() {
    const stats = {
      totalInteractions: this.carouselInteractions.length,
      nextSlideCount: this.carouselInteractions.filter(e => e.type === 'nextSlide').length,
      prevSlideCount: this.carouselInteractions.filter(e => e.type === 'prevSlide').length,
      imageClicksByIndex: {} as Record<number, number>,
    };

    this.carouselInteractions.forEach(interaction => {
      if (interaction.type === 'imageClick') {
        const index = interaction.imageIndex;
        stats.imageClicksByIndex[index] = (stats.imageClicksByIndex[index] || 0) + 1;
      }
    });

    return stats;
  }

  getVideoInteractions() {
    return this.videoInteractions;
  }

  getCarouselInteractions() {
    return this.carouselInteractions;
  }

  resetVideoInteractions() {
    this.videoInteractions = [];
  }

  resetCarouselInteractions() {
    this.carouselInteractions = [];
  }
}

export const globalEventTracker = new EventTracker();
