import { Video, Playlist } from '../types';
import { PlaybackService } from '../services/PlaybackService';

export class PlaylistComponent {
  private playbackService: PlaybackService;
  private playlistElement: HTMLElement;

  constructor(playbackService: PlaybackService) {
    this.playbackService = playbackService;
    this.playlistElement = document.createElement('div');
    this.playlistElement.className = 'playlist';
  }

  render(playlist: Playlist, onVideoSelect: (video: Video) => void): HTMLElement {
    this.playlistElement.innerHTML = `
      <h3>${playlist.name}</h3>
      <ul class="video-list">
        ${playlist.videos.map(video => `
          <li class="video-item" data-video-id="${video.id}">
            <img src="${video.thumbnail || 'default-thumbnail.jpg'}" alt="${video.title}">
            <span>${video.title}</span>
          </li>
        `).join('')}
      </ul>
    `;

    this.attachEvents(onVideoSelect);
    return this.playlistElement;
  }

  private attachEvents(onVideoSelect: (video: Video) => void): void {
    const videoItems = this.playlistElement.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
      item.addEventListener('click', () => {
        const videoId = item.getAttribute('data-video-id');
        const videoElement = this.playlistElement.querySelector(`[data-video-id="${videoId}"]`);
        
        if (videoElement) {
          const videoTitle = videoElement.querySelector('span')?.textContent;
          const video = {
            id: videoId!,
            title: videoTitle!,
            src: '../videos/*', // Você precisará mapear o ID para o src real
            duration: 0 // E para a duração real
          };
          
          onVideoSelect(video);
        }
      });
    });
  }
}