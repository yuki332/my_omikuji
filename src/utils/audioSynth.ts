// Web Audio API Synthesizer for Shrine Sound Effects
class ShrineAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgmGain) {
      this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx?.currentTime || 0);
    }
    return this.isMuted;
  }

  public getMuteState(): boolean {
    return this.isMuted;
  }

  // Play wooden cylinder shaking sound (おみくじ筒を振るカラカラ音)
  public playShakingSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Multi-pop wooden resonance
    for (let i = 0; i < 4; i++) {
      const delay = i * 0.12 + (Math.random() * 0.04);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Wooden block frequency
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220 + Math.random() * 180, now + delay);
      osc.frequency.exponentialRampToValueAtTime(80, now + delay + 0.08);

      gain.gain.setValueAtTime(0.25, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.09);
    }
  }

  // Play stick popping out sound (おみくじ棒が出るシャキーン音)
  public playStickSlideSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Sliding friction + wooden click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Play Kagura Shrine Bell Chime (神楽鈴・瑞雲の澄んだ金色の鈴音)
  public playFortuneRevealChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Pentatonic scale shrine chime tones
    const frequencies = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C E G C E G

    frequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.18 - idx * 0.02, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.9);
    });
  }

  // Play Paper Tying Sound (おみくじを結ぶ音・柏手/和紙の優しさ)
  public playTiePaperSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Soft wooden clap/chime combination
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Ambient Shrine Meditation Drone (神社の厳かな風・静寂音)
  public toggleAmbientBgm(): boolean {
    this.initCtx();
    if (!this.ctx) return false;

    if (this.isBgmPlaying) {
      if (this.bgmGain) {
        this.bgmGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      this.isBgmPlaying = false;
      return false;
    }

    const now = this.ctx.currentTime;
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.001, now);
    this.bgmGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.06, now + 2);

    // Continuous soft pentatonic pad chord
    const chord = [220, 261.63, 329.63, 392.00]; // A minor pentatonic / Japanese Insen feel
    chord.forEach((freq) => {
      if (!this.ctx || !this.bgmGain) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle LFO modulation for breathing wind effect
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.2, now);
      lfoGain.gain.setValueAtTime(3, now);
      lfo.connect(osc.frequency);
      lfo.start(now);

      osc.connect(this.bgmGain);
      osc.start(now);
    });

    this.bgmGain.connect(this.ctx.destination);
    this.isBgmPlaying = true;
    return true;
  }

  public getBgmState(): boolean {
    return this.isBgmPlaying;
  }
}

export const shrineAudio = new ShrineAudioEngine();
