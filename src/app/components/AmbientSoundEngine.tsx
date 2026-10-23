import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ════════════════════════════════════════════════════════════════
   AMBIENT SOUND ENGINE (PROCEDURAL)
   ─────────────────────────────────────────────────────────────
   Generates a cinematic ambient soundtrack in real-time using
   Web Audio API.

   Mood: Hopeful, human, expansive, calm confidence.
   Style: Minimal, warm, airy, wide stereo field.
   Tempo: ~70 BPM (breathing rhythm).
   Key: D major pentatonic (universally hopeful).
   ════════════════════════════════════════════════════════════════ */

// ── Musical Constants ──────────────────────────────────────────
const ROOT = 146.83; // D3
const SCALE_RATIOS = [1, 9 / 8, 5 / 4, 3 / 2, 15 / 8]; // Pentatonic: D E F# A B
const OCTAVES = [0.5, 1, 2];

function noteFreq(degree: number, octave: number = 1): number {
  const ratio = SCALE_RATIOS[((degree % SCALE_RATIOS.length) + SCALE_RATIOS.length) % SCALE_RATIOS.length];
  return ROOT * ratio * octave;
}

// ── Utility: Create Filtered Oscillator with Panning ───────────
function createSource(
  ctx: AudioContext,
  type: OscillatorType,
  freq: number,
  pan: number = 0 // -1 to 1
) {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";

  const panner = ctx.createStereoPanner();
  panner.pan.value = pan;

  const gain = ctx.createGain();
  gain.gain.value = 0;

  osc.connect(filter);
  filter.connect(panner);
  panner.connect(gain);

  return { osc, filter, panner, gain };
}

// ── The Engine Class ───────────────────────────────────────────
class AmbientEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private reverbGain: GainNode | null = null;
  private isRunning = false;
  private timers: number[] = [];
  private oscillators: AudioScheduledSourceNode[] = [];
  private readonly MAX_VOLUME = 0.3; // 30% max as requested
  private fadeTime = 2; // 2s fade in

  async start(): Promise<void> {
    if (this.isRunning) return;

    // Initialize AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContextClass();
    const ctx = this.ctx;

    // ── Master Chain ──
    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = 0; // Start muted

    // ── Reverb (Convolver for "Airy/Open" feel if impulse available, else Delay Network) ──
    // We'll use a high-quality delay network for procedural reverb to avoid external assets
    this.reverbGain = ctx.createGain();
    this.reverbGain.gain.value = 0.35; // Airy

    const delayL = ctx.createDelay();
    const delayR = ctx.createDelay();
    delayL.delayTime.value = 0.37;
    delayR.delayTime.value = 0.53;

    const feedbackL = ctx.createGain();
    const feedbackR = ctx.createGain();
    feedbackL.gain.value = 0.4;
    feedbackR.gain.value = 0.35;

    // Cross-feed for stereo width
    delayL.connect(feedbackL).connect(delayL);
    delayR.connect(feedbackR).connect(delayR);
    
    // Filter the reverb tails
    const reverbFilter = ctx.createBiquadFilter();
    reverbFilter.type = "lowpass";
    reverbFilter.frequency.value = 3500; // Warm but airy

    this.reverbGain.connect(delayL);
    this.reverbGain.connect(delayR);
    delayL.connect(reverbFilter);
    delayR.connect(reverbFilter);
    reverbFilter.connect(this.masterGain);

    // Direct signal
    this.masterGain.connect(ctx.destination);

    this.isRunning = true;

    // ── LAYERS ──
    this.createAtmosphere(ctx); // Wind/Air
    this.createWarmPads(ctx);   // Chords
    this.createPiano(ctx);      // Melody
    this.createStrings(ctx);    // Orchestral Texture
    this.createPulse(ctx);      // Heartbeat

    // Fade In
    const now = ctx.currentTime;
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(this.MAX_VOLUME, now + this.fadeTime);
  }

  // ── 1. Atmosphere (Airy, Open) ───────────────────────────────
  private createAtmosphere(ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1); // White noise
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Bandpass to focus on "Air" frequencies (highs)
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 1;

    // Slow movement
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05; // 20s cycle
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 600;
    lfo.connect(lfoGain).connect(filter.frequency);

    const gain = ctx.createGain();
    gain.gain.value = 0.015; // Very subtle background

    noise.connect(filter).connect(gain).connect(this.masterGain!);
    noise.connect(filter).connect(gain).connect(this.reverbGain!);

    noise.start();
    lfo.start();
    this.oscillators.push(noise, lfo);
  }

  // ── 2. Warm Pads (Soft, Expansive) ───────────────────────────
  private createWarmPads(ctx: AudioContext) {
    const chord = [noteFreq(0, 0.5), noteFreq(0, 1), noteFreq(4, 0.5)]; // D2, D3, B2

    chord.forEach((freq, i) => {
      // Left and Right oscillators for stereo width
      [-0.4, 0.4].forEach((pan) => {
        const { osc, filter, gain, panner } = createSource(ctx, "triangle", freq, pan);
        
        // Filter movement
        filter.frequency.value = 200;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.03 + Math.random() * 0.02;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 100;
        lfo.connect(lfoGain).connect(filter.frequency);

        gain.gain.value = 0.04;

        osc.connect(filter).connect(panner).connect(gain).connect(this.masterGain!);
        osc.connect(filter).connect(panner).connect(gain).connect(this.reverbGain!);

        osc.start();
        lfo.start();
        this.oscillators.push(osc, lfo);
      });
    });
  }

  // ── 3. Warm Piano (Minimal, Spacious) ────────────────────────
  private createPiano(ctx: AudioContext) {
    const playNote = () => {
      if (!this.isRunning) return;

      const degree = Math.floor(Math.random() * SCALE_RATIOS.length);
      const octave = OCTAVES[1 + Math.floor(Math.random() * 2)]; // Mid/High
      const freq = noteFreq(degree, octave);
      const pan = (Math.random() * 2 - 1) * 0.6; // Random pan

      // Oscillator for tone
      const osc = ctx.createOscillator();
      osc.type = "triangle"; // Warmer than sine
      osc.frequency.value = freq;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800; // Muted warmth

      const panner = ctx.createStereoPanner();
      panner.pan.value = pan;

      const gain = ctx.createGain();
      const now = ctx.currentTime;
      
      // Envelope: Fast attack, long exponential decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.05); // Soft hammer
      gain.gain.exponentialRampToValueAtTime(0.001, now + 5); // Ring out

      osc.connect(filter).connect(panner).connect(gain);
      gain.connect(this.masterGain!);
      gain.connect(this.reverbGain!);

      osc.start(now);
      osc.stop(now + 6);

      // Schedule next note (Spacious: 4-9 seconds)
      const nextTime = 4000 + Math.random() * 5000;
      this.timers.push(window.setTimeout(playNote, nextTime) as unknown as number);
    };

    this.timers.push(window.setTimeout(playNote, 2000) as unknown as number);
  }

  // ── 4. Strings / Choir (Light, Restrained) ───────────────────
  private createStrings(ctx: AudioContext) {
    const freqs = [noteFreq(2, 2), noteFreq(4, 2)]; // F#4, B4 (High harmonies)

    freqs.forEach((freq, i) => {
      const { osc, filter, gain, panner } = createSource(ctx, "sawtooth", freq, i === 0 ? -0.3 : 0.3);
      
      filter.frequency.value = 600;
      filter.Q.value = 1;

      // Slow swells
      const swell = () => {
        if (!this.isRunning) return;
        const now = ctx.currentTime;
        const duration = 8 + Math.random() * 4;
        
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0.015, now + duration * 0.4); // Swell up
        gain.gain.linearRampToValueAtTime(0.001, now + duration);      // Fade out

        this.timers.push(
            window.setTimeout(swell, duration * 1000 + Math.random() * 2000) as unknown as number
        );
      };

      osc.connect(filter).connect(panner).connect(gain);
      gain.connect(this.reverbGain!); // 100% wet for distance

      osc.start();
      this.oscillators.push(osc);
      
      // Start swelling after delay
      this.timers.push(window.setTimeout(swell, 1000 + i * 3000) as unknown as number);
    });
  }

  // ── 5. Heartbeat Pulse (Deep, Gentle) ────────────────────────
  private createPulse(ctx: AudioContext) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 50; // Deep sub

    const gain = ctx.createGain();
    gain.gain.value = 0;

    osc.connect(gain).connect(this.masterGain!);
    osc.start();
    this.oscillators.push(osc);

    const pulse = () => {
      if (!this.isRunning) return;
      const now = ctx.currentTime;
      // Soft throb
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      // ~70 BPM
      this.timers.push(window.setTimeout(pulse, 1714) as unknown as number);
    };

    this.timers.push(window.setTimeout(pulse, 500) as unknown as number);
  }

  // ── Cleanup ──────────────────────────────────────────────────
  async stop(): Promise<void> {
    if (!this.isRunning || !this.ctx || !this.masterGain) return;
    this.isRunning = false;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Fade Out
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.5);

    // Hard stop after fade
    await new Promise((resolve) => setTimeout(resolve, 1600));

    this.timers.forEach(clearTimeout);
    this.timers = [];

    this.oscillators.forEach((osc) => {
      try { osc.stop(); } catch {}
    });
    this.oscillators = [];

    try { await ctx.close(); } catch {}
    
    this.ctx = null;
    this.masterGain = null;
    this.reverbGain = null;
  }
}

// ── COMPONENT ──────────────────────────────────────────────────

export function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const engineRef = useRef<AmbientEngine | null>(null);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (engineRef.current) {
        await engineRef.current.stop();
        engineRef.current = null;
      }
    } else {
      setIsPlaying(true);
      const engine = new AmbientEngine();
      engineRef.current = engine;
      await engine.start();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (engineRef.current) engineRef.current.stop();
    };
  }, []);

  return (
    <motion.button
      onClick={toggle}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center justify-center"
      style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: isPlaying ? "#000000" : "#ffffff",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.08)",
        cursor: "pointer"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Icon Graphic */}
      <div className="relative w-4 h-4 flex items-center justify-center gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-[2px] rounded-full"
            style={{
              backgroundColor: isPlaying ? "#fff" : "#000000",
            }}
            animate={{
              height: isPlaying ? [4, 12, 6, 10][i] : 3,
              opacity: isPlaying ? 1 : 0.6
            }}
            // Animate only when playing
            {...(isPlaying && {
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.8 + i * 0.2,
                ease: "easeInOut"
              }
            })}
          />
        ))}
      </div>

      {/* Tooltip Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: -16 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute right-full top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
          >
            <span className="text-[10px] font-medium tracking-widest uppercase text-black bg-white px-2 py-1 rounded">
              {isPlaying ? "Mute" : "Soundtrack"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}