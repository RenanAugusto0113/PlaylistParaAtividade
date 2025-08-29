import { Video, Playlist, PlaybackMode } from '../types';
import { PlaybackService } from '../services/PlaybackService';
import { Controls } from './Controls';
import { PlaylistComponent } from './Playlist';

export class VideoPlayer {
  private playbackService: PlaybackService;
  private controls: Controls;
  private playlistComponent: PlaylistComponent;
  private container: HTMLElement;
  private currentPlaylist: Playlist | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.playbackService = new PlaybackService();
    this.controls = new Controls(this.playbackService);
    this.playlistComponent = new PlaylistComponent(this.playbackService);
  }

  initialize(): void {
    this.container.innerHTML = `
      <div class="video-container">
        <div class="video-wrapper"></div>
        <div class="controls-container"></div>
        <div class="playlist-container"></div>
        <div class="history-container"></div>
      </div>
    `;

    const videoWrapper = this.container.querySelector('.video-wrapper') as HTMLElement;
    const controlsContainer = this.container.querySelector('.controls-container') as HTMLElement;
    const playlistContainer = this.container.querySelector('.playlist-container') as HTMLElement;

    // Adiciona o elemento de vídeo
    videoWrapper.appendChild(this.playbackService.getVideoElement());
    
    // Renderiza os controles
    controlsContainer.appendChild(this.controls.render(
      () => this.nextVideo(),
      () => this.previousVideo()
    ));
  }

  loadPlaylist(playlist: Playlist): void {
    this.currentPlaylist = playlist;
    
    const playlistContainer = this.container.querySelector('.playlist-container') as HTMLElement;
    playlistContainer.innerHTML = '';
    
    if (this.currentPlaylist) {
      playlistContainer.appendChild(
        this.playlistComponent.render(this.currentPlaylist, (video) => {
          this.playbackService.play(video);
        })
      );
    }
  }

  private nextVideo(): void {
    if (this.currentPlaylist) {
      this.playbackService.next(this.currentPlaylist.videos);
    }
  }

  private previousVideo(): void {
    if (this.currentPlaylist) {
      this.playbackService.previous(this.currentPlaylist.videos);
    }
  }

  setPlaybackMode(mode: PlaybackMode): void {
    this.playbackService.setPlaybackMode(mode);
  }
}