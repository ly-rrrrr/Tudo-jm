import { useRef, useEffect } from 'preact/hooks';
import { useApp } from '../context/AppContext.jsx';
import './Starfield.css';

const INTENSITY_MAP = {
  low: { count: 80, speed: 0.3, twinkle: 0.005 },
  medium: { count: 180, speed: 0.6, twinkle: 0.01 },
  high: { count: 300, speed: 1.0, twinkle: 0.02 },
};

export default function Starfield() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const rafRef = useRef(null);
  const frameCountRef = useRef(0);
  const { state } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let running = true;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const cfg = INTENSITY_MAP[state.settings.starfieldIntensity] || INTENSITY_MAP.medium;

    function initStars() {
      starsRef.current = Array.from({ length: cfg.count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * cfg.speed * 0.5 + cfg.speed * 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    }
    initStars();

    function drawNebula() {
      const cx = canvas.width * 0.6;
      const cy = canvas.height * 0.35;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.5);
      grad.addColorStop(0, 'rgba(0, 180, 220, 0.04)');
      grad.addColorStop(0.4, 'rgba(0, 100, 180, 0.02)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw(timestamp) {
      if (!running) return;
      frameCountRef.current++;
      // Throttle to ~30fps
      if (frameCountRef.current % 2 === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNebula();

      for (const star of starsRef.current) {
        star.y += star.speed * 0.05;
        if (star.y > canvas.height + 5) {
          star.y = -5;
          star.x = Math.random() * canvas.width;
        }
        const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    // Pause when tab hidden
    function onVisibility() {
      if (document.hidden) {
        running = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      } else {
        running = true;
        rafRef.current = requestAnimationFrame(draw);
      }
    }
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [state.settings.starfieldIntensity]);

  return <canvas ref={canvasRef} class="starfield-canvas" />;
}
