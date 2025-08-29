export interface Video {
  id: string;
  title: string;
  src: string;
  duration: number;
  thumbnail?: string;
}

export interface Playlist {
  id: string;
  name: string;
  videos: Video[];
}

export type PlaybackMode = 'normal' | 'loop' | 'shuffle';