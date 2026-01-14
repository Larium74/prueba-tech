import { useState, useRef, useEffect } from 'react';
import { globalEventTracker } from '../../utils/eventTracker';
import './FacebookVideoBanner.css';

interface FacebookVideoBannerProps {
  redirectUrl: string;
  videoUrl: string;
  title: string;
}

export function FacebookVideoBanner({ redirectUrl, videoUrl, title }: FacebookVideoBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stats, setStats] = useState({
    totalInteractions: 0,
    playCount: 0,
    pauseCount: 0,
    muteCount: 0,
    unmuteCount: 0,
    volumeChanges: 0,
  });
  const [isMuted, setIsMuted] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    updateStats();
    if (videoRef.current) setIsMuted(!!videoRef.current.muted);
  }, []);

  const updateStats = () => {
    setStats(globalEventTracker.getVideoStats());
  };

  const handlePlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.stopPropagation();
    globalEventTracker.trackVideoInteraction('play');
    updateStats();
  };

  const handlePause = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.stopPropagation();
    globalEventTracker.trackVideoInteraction('pause');
    updateStats();
  };

  const handleVolumeChange = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.stopPropagation();
    const el = e.target as HTMLVideoElement;
    const volume = el.volume;
    const wasMuted = isMuted;
    const isMutedNow = el.muted;
    
    if (isMutedNow !== wasMuted) {
      setIsMuted(isMutedNow);
      globalEventTracker.trackVideoInteraction(isMutedNow ? 'mute' : 'unmute');
    } else {
      globalEventTracker.trackVideoInteraction('volumeChange', volume);
    }
    updateStats();
  };

  const handleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
        globalEventTracker.trackVideoInteraction('unmute');
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
        globalEventTracker.trackVideoInteraction('mute');
      }
      updateStats();
    }
  };

  const handleBannerClick = () => {
    window.open(redirectUrl, '_blank');
  };

  return (
    <div className="facebook-banner" onClick={handleBannerClick}>
      <div className="banner-container">
        <div className="banner-header">
          <h3>{title}</h3>
        </div>

        <div className="video-container">
          <video
            ref={videoRef}
            controls
            onPlay={handlePlay}
            onPause={handlePause}
            onVolumeChange={handleVolumeChange}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', height: 'auto' }}
          >
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
          <button
            className="mute-button"
            onClick={handleMute}
            title="Toggle Mute"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>

        <div className="cta-container">
          <button className="cta-button" onClick={handleBannerClick}>
            Ver más
          </button>
        </div>

        <button
          className="stats-button"
          onClick={(e) => {
            e.stopPropagation();
            setShowStats(!showStats);
          }}
        >
          {showStats ? 'Ocultar' : 'Ver'} Estadísticas
        </button>

        {showStats && (
          <div className="stats-container">
            <h4>Interacciones del Video</h4>
            <ul>
              <li>Total de interacciones: {stats.totalInteractions}</li>
              <li>Play: {stats.playCount}</li>
              <li>Pause: {stats.pauseCount}</li>
              <li>Mute: {stats.muteCount}</li>
              <li>Unmute: {stats.unmuteCount}</li>
              <li>Cambios de volumen: {stats.volumeChanges}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
