// Web Audio API Synthesizer for notifications and completion chimes
// Zero external assets needed, works reliably in any browser

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a gentle double bell chime for task starts or alerts
 */
export function playNotificationChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // First tone (E5 ~ 659.25Hz)
    playTone(ctx, 659.25, now, 0.4, 0.15);
    // Second harmonic tone (A5 ~ 880Hz)
    playTone(ctx, 880.0, now + 0.12, 0.6, 0.12);
  } catch (err) {
    console.warn('Audio chime error:', err);
  }
}

/**
 * Play a cheerful completion chime when a task is checked off
 */
export function playSuccessChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    playTone(ctx, 523.25, now, 0.15, 0.08); // C5
    playTone(ctx, 659.25, now + 0.08, 0.15, 0.08); // E5
    playTone(ctx, 783.99, now + 0.16, 0.35, 0.12); // G5
  } catch (err) {
    console.warn('Audio chime error:', err);
  }
}

function playTone(ctx: AudioContext, freq: number, startTime: number, duration: number, maxVol: number): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(maxVol, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}
