import { useEffect, useRef } from 'react';

// Relative coordinates for a few major constellations [-1, 1] range
const constellations = [
  // Ursa Major (Big Dipper)
  {
    stars: [
      { x: -0.6, y: -0.5 }, { x: -0.4, y: -0.4 }, { x: -0.2, y: -0.3 },
      { x: -0.1, y: -0.1 }, { x: 0.1, y: -0.15 }, { x: 0.2, y: 0.0 },
      { x: -0.1, y: 0.1 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]]
  },
  // Orion
  {
    stars: [
      { x: 0.3, y: 0.2 }, { x: 0.5, y: 0.1 }, // Shoulders
      { x: 0.35, y: 0.35 }, { x: 0.4, y: 0.4 }, { x: 0.45, y: 0.45 }, // Belt
      { x: 0.2, y: 0.6 }, { x: 0.6, y: 0.5 } // Feet
    ],
    lines: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [0, 1]]
  },
  // Cassiopeia (W shape)
  {
    stars: [
      { x: 0.7, y: -0.6 }, { x: 0.8, y: -0.4 }, { x: 0.65, y: -0.3 },
      { x: 0.85, y: -0.2 }, { x: 0.75, y: 0.0 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  // Cygnus (Swan)
  {
    stars: [
      { x: -0.7, y: 0.5 }, { x: -0.5, y: 0.6 }, { x: -0.3, y: 0.7 }, // Body
      { x: -0.6, y: 0.3 }, { x: -0.4, y: 0.9 } // Wings
    ],
    lines: [[0, 1], [1, 2], [3, 1], [4, 1]]
  }
];

export function StarryNight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    
    // Generate background stars
    const backgroundStars: {x: number, y: number, size: number, alpha: number, twinkleSpeed: number}[] = [];
    for(let i = 0; i < 400; i++) {
       // Spread them from -1.5 to 1.5 to cover corners when rotating
       backgroundStars.push({
         x: (Math.random() * 3 - 1.5),
         y: (Math.random() * 3 - 1.5),
         size: Math.random() * 1.5 + 0.5,
         alpha: Math.random(),
         twinkleSpeed: (Math.random() * 0.02) + 0.005
       });
    }

    // Meteor logic
    type Meteor = { x: number; y: number; length: number; speed: number; angle: number; age: number; maxAge: number };
    const meteors: Meteor[] = [];

    const spawnMeteor = () => {
      // Spawn near the top/right mostly
      meteors.push({
        x: Math.random() * 2, // 0 to 2
        y: (Math.random() * 1) - 1, // -1 to 0 (top half)
        length: Math.random() * 0.2 + 0.1, // 10% to 30% of screen
        speed: Math.random() * 0.015 + 0.015, // 25% slower meteor streak
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1), // Down-leftish
        age: 0,
        maxAge: Math.random() * 50 + 50
      });
      
      // Randomly queue next meteor (every 2-6 seconds)
      setTimeout(spawnMeteor, Math.random() * 4000 + 2000);
    };
    
    // Start meteor spawner once
    const initialMeteorTimer = setTimeout(spawnMeteor, 2000);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Calculate base rotation based on day of year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const baseRotation = (dayOfYear / 365) * Math.PI * 2; // Radian rotation based on season
    
    let timeRotation = 0;

    const render = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.8; // Scale factor mapping [-1, 1] to pixels

      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Add a very slow drift over time
      timeRotation += 0.00015; // 25% slower drift
      ctx.rotate(baseRotation + timeRotation);

      // Draw background stars
      backgroundStars.forEach(star => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0) star.twinkleSpeed *= -1;
        
        const opacity = Math.max(0, Math.min(1, star.alpha));
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x * scale, star.y * scale, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Constellations
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)'; // Faint glowing lines
      ctx.lineWidth = 1;
      
      constellations.forEach(constellation => {
        // Draw lines
        ctx.beginPath();
        constellation.lines.forEach(([startIdx, endIdx]) => {
          const s1 = constellation.stars[startIdx];
          const s2 = constellation.stars[endIdx];
          ctx.moveTo(s1.x * scale, s1.y * scale);
          ctx.lineTo(s2.x * scale, s2.y * scale);
        });
        ctx.stroke();

        // Draw major stars
        constellation.stars.forEach(star => {
          ctx.fillStyle = 'rgba(0, 128, 254, 0.8)'; // Orange accent stars! No wait, blue is prettier
          // Actually let's use the theme accent
          ctx.beginPath();
          ctx.arc(star.x * scale, star.y * scale, 2.5, 0, Math.PI * 2);
          ctx.fill();
          
          // Glow
          ctx.fillStyle = 'rgba(0, 128, 254, 0.2)';
          ctx.beginPath();
          ctx.arc(star.x * scale, star.y * scale, 6, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      ctx.restore(); // Restore so meteors don't forcefully rotate with the sky

      // Draw Meteors
      ctx.save();
      ctx.translate(centerX, centerY);
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.age++;
        
        // Move meteor
        m.x -= Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        
        if (m.age > m.maxAge) {
          meteors.splice(i, 1);
          continue;
        }

        const opacity = Math.sin((m.age / m.maxAge) * Math.PI); // Fade in and out
        
        const headX = m.x * scale;
        const headY = m.y * scale;
        const tailX = headX + Math.cos(m.angle) * (m.length * scale);
        const tailY = headY - Math.sin(m.angle) * (m.length * scale);

        const gradient = ctx.createLinearGradient(headX, headY, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.1, `rgba(0, 255, 255, ${opacity * 0.8})`);
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(initialMeteorTimer);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }} 
    />
  );
}
