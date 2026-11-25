// Client-side Procedural Web Audio Ambient Soundscape Engine for Shahid Kouluri Portfolio
// 100% Autoplay-policy compliant: only initializes upon explicit user interaction.

class CinematicSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = true;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientGains: GainNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isInitialized: boolean = false;

  private initContext() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low-Pass Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(420, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Subtle LFO modulating the filter cutoff for an ethereal breathing effect
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 8-second cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    this.lfo.start();

    // Ambient Chord: Deep futuristic minor 9th (D - F - A - C - E)
    // Frequencies: D2 (73.4Hz), A2 (110Hz), F3 (174.6Hz), C4 (261.6Hz), E4 (329.6Hz)
    const frequencies = [73.42, 110.0, 174.61, 261.63, 329.63];

    frequencies.forEach((freq, i) => {
      if (!this.ctx || !this.filter) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft sine and triangle waves for organic warmth
      osc.type = i === 0 ? 'sine' : i % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle individual gain values
      const individualVolume = i === 0 ? 0.08 : 0.035;
      gain.gain.setValueAtTime(individualVolume, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.filter);
      osc.start();

      this.ambientOscillators.push(osc);
      this.ambientGains.push(gain);
    });

    this.isInitialized = true;
  }

  public async enableAudio(): Promise<boolean> {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return false;

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      // Smooth volume fade-in
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.28, now + 1.8);

      this.isMuted = false;
      return true;
    } catch {
      return false;
    }
  }

  public disableAudio(): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
    this.isMuted = true;
  }

  public toggle(): boolean {
    if (this.isMuted) {
      this.enableAudio();
      return true;
    } else {
      this.disableAudio();
      return false;
    }
  }

  public getIsPlaying(): boolean {
    return !this.isMuted && this.isInitialized;
  }

  // Futuristic micro-interaction chime on hover/click
  public playInteractionChime(freq: number = 880): void {
    if (this.isMuted || !this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new CinematicSoundEngine();
