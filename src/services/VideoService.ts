export class VideoService {
  private static instance: VideoService;
  private isProduction: boolean = false;

  private constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  static getInstance(): VideoService {
    if (!VideoService.instance) {
      VideoService.instance = new VideoService();
    }
    return VideoService.instance;
  }

  getVideoPath(filename: string): string {
    if (this.isProduction) {
      return `https://seuservidor.com/videos/${filename}`;
    } else {
      // ✅ AGORA APONTA PARA A PASTA VIDEOS NA RAIZ
      return './videos/' + filename;
    }
  }

  setProductionMode(isProduction: boolean): void {
    this.isProduction = isProduction;
  }
}