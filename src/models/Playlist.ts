import { Video, Playlist } from "../types";

export class VideoModel implements Video {
  constructor(
    public id: string,
    public title: string,
    public src: string,
    public duration: number,   // Duração em segundos
    public thumbnail?: string
  ) {}

  // Gera URL para thumbnail a partir do frame do vídeo
  get thumbnailSrc(): string {
    return `${this.src}#t=5`; // Frame no segundo 5
  }
}

export class PlaylistModel implements Playlist {
  constructor(
    public id: string,
    public name: string,
    public videos: VideoModel[] = []
  ) {}
  
  addVideo(video: VideoModel): void {
    this.videos.push(video);
  }
  
  removeVideo(videoId: string): void {
    this.videos = this.videos.filter(v => v.id !== videoId);
  }
}