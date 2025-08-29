import { PlaybackService } from '../services/PlaybackService';
import { Video } from '../types';

export class Controls {
  private playbackService: PlaybackService;
  private controlsElement: HTMLElement;

  constructor(playbackService: PlaybackService) {
    this.playbackService = playbackService;
    this.controlsElement = document.createElement('div');
    this.controlsElement.className = 'video-controls';
  }

  render(onNext: () => void, onPrevious: () => void): HTMLElement {
    this.controlsElement.innerHTML = `
      <button class="control-btn" id="play-btn">▶</button>
      <button class="control-btn" id="pause-btn">⏸</button>
      <button class="control-btn" id="stop-btn">⏹</button>
      <button class="control-btn" id="prev-btn">⏮</button>
      <button class="control-btn" id="next-btn">⏭</button>
      <select class="control-select" id="mode-select">
        <option value="normal">Normal</option>
        <option value="loop">Loop</option>
        <option value="shuffle">Aleatório</option>
      </select>
    `;

    this.attachEvents(onNext, onPrevious);
    return this.controlsElement;
  }

  private attachEvents(onNext: () => void, onPrevious: () => void): void {
    const playBtn = this.controlsElement.querySelector('#play-btn') as HTMLButtonElement;
    const pauseBtn = this.controlsElement.querySelector('#pause-btn') as HTMLButtonElement;
    const stopBtn = this.controlsElement.querySelector('#stop-btn') as HTMLButtonElement;
    const prevBtn = this.controlsElement.querySelector('#prev-btn') as HTMLButtonElement;
    const nextBtn = this.controlsElement.querySelector('#next-btn') as HTMLButtonElement;
    const modeSelect = this.controlsElement.querySelector('#mode-select') as HTMLSelectElement;

    playBtn.addEventListener('click', () => this.playbackService.play());
    pauseBtn.addEventListener('click', () => this.playbackService.pause());
    stopBtn.addEventListener('click', () => this.playbackService.stop());
    prevBtn.addEventListener('click', onPrevious);
    nextBtn.addEventListener('click', onNext);
    
    modeSelect.addEventListener('change', () => {
      this.playbackService.setPlaybackMode(modeSelect.value as any);
    });
  }
}