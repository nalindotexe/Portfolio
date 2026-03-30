import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Hero.css';

// Simple particles component
function Particles() {
  const [particles, setParticles] = useState<{ id: number; top: string; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate static particle data purely on client side to avoid layout shift
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1, // 1px to 4px
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * -30, // Negative delay to start immediately mid-animation
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const [magneticStyle, setMagneticStyle] = useState<Record<string, React.CSSProperties>>({});

  // Shared magnetic hover handler
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMagneticStyle(prev => ({
      ...prev,
      [id]: { transform: `translate(${x * 0.4}px, ${y * 0.4}px)` }
    }));
  };

  const handleMouseLeave = (id: string) => {
    setMagneticStyle(prev => ({ ...prev, [id]: { transform: 'translate(0px, 0px)' } }));
  };

  return (
    <section id="hero" className="hero-section">
      <Particles />
      <div className="hero-content">
        <h3 className="hero-subtitle typewriter">HEY, I'M</h3>
        <h1 className="hero-title text-orange neon-flicker" data-text="Nalin Singh">
          Nalin<br />Singh
        </h1>
        <p className="hero-description fade-in-delay">
          Aspiring developer specializing in getting it done.
        </p>

        <div className="hero-socials fade-in-delay-more">
          <a
            href="https://github.com/nalindotexe"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link magnetic"
            style={magneticStyle['github']}
            onMouseMove={(e) => handleMouseMove(e, 'github')}
            onMouseLeave={() => handleMouseLeave('github')}
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/nalindotexe"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link magnetic"
            style={magneticStyle['linkedin']}
            onMouseMove={(e) => handleMouseMove(e, 'linkedin')}
            onMouseLeave={() => handleMouseLeave('linkedin')}
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:hello@example.com"
            className="social-link magnetic"
            style={magneticStyle['mail']}
            onMouseMove={(e) => handleMouseMove(e, 'mail')}
            onMouseLeave={() => handleMouseLeave('mail')}
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
