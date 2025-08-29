import { Video } from '../types';

export class HistoryService {
  private history: Video[] = [];
  private maxHistorySize: number = 50;

  addToHistory(video: Video): void {
    this.history = this.history.filter(v => v.id !== video.id);
    
    this.history.unshift(video);
    
    if (this.history.length > this.maxHistorySize) {
      this.history.pop();
    }
  }

  getHistory(): Video[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }
}