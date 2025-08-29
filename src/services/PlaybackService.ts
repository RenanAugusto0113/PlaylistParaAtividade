import { Video, PlaybackMode } from '../types';
import { HistoryService } from './HistoryService';

export class PlaybackService {
  private currentVideo: Video | null = null;
  private isPlaying: boolean = false;
  private playbackMode: PlaybackMode = 'normal';
  private videoElement: HTMLVideoElement;
  private historyService: HistoryService;

  constructor() {
    this.videoElement = document.createElement('video');
    this.historyService = new HistoryService();
  }

  play(video?: Video): void {
    if (video && video !== this.currentVideo) {
      this.loadVideo(video);
    }
    
    this.videoElement.play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch(error => {
        console.error('Erro ao reproduzir vídeo:', error);
      });
  }

  pause(): void {
    this.videoElement.pause();
    this.isPlaying = false;
  }

  stop(): void {
    this.videoElement.pause();
    this.videoElement.currentTime = 0;
    this.isPlaying = false;
  }

  next(videos: Video[]): Video | null {
    if (!this.currentVideo || videos.length === 0) return null;
    
    let nextIndex: number;
    const currentIndex = videos.findIndex(v => v.id === this.currentVideo?.id);
    
    if (this.playbackMode === 'shuffle') {
      nextIndex = Math.floor(Math.random() * videos.length);
    } else {
      nextIndex = (currentIndex + 1) % videos.length;
    }
    
    const nextVideo = videos[nextIndex];
    this.loadVideo(nextVideo);
    this.play();
    
    return nextVideo;
  }

  previous(videos: Video[]): Video | null {
    if (!this.currentVideo || videos.length === 0) return null;
    
    const currentIndex = videos.findIndex(v => v.id === this.currentVideo?.id);
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
    const prevVideo = videos[prevIndex];
    
    this.loadVideo(prevVideo);
    this.play();
    
    return prevVideo;
  }

  setPlaybackMode(mode: PlaybackMode): void {
    this.playbackMode = mode;
    
    if (mode === 'loop') {
      this.videoElement.loop = true;
    } else {
      this.videoElement.loop = false;
    }
  }

  getPlaybackMode(): PlaybackMode {
    return this.playbackMode;
  }

  private loadVideo(video: Video): void {
    this.currentVideo = video;
    this.videoElement.src = video.src;
    this.historyService.addToHistory(video);
  }

  getCurrentVideo(): Video | null {
    return this.currentVideo;
  }

  getVideoElement(): HTMLVideoElement {
    return this.videoElement;
  }
}