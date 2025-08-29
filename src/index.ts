import { VideoPlayer } from './components/VideoPlayer';
import { PlaylistModel, VideoModel } from './models/Playlist';

// Exemplo de criação de playlist
const playlist = new PlaylistModel('1', 'Minha Playlist');
playlist.addVideo(new VideoModel('1', 'Vídeo 1', 'video1.mp4', 120));
playlist.addVideo(new VideoModel('2', 'Vídeo 2', 'video2.mp4', 180));
playlist.addVideo(new VideoModel('3', 'Vídeo 3', 'video3.mp4', 150));

// Inicialização do player
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('video-player') as HTMLElement;
  const player = new VideoPlayer(container);
  player.initialize();
  player.loadPlaylist(playlist);
});