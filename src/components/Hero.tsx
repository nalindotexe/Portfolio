import React, { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Hero.css';

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
      <div className="hero-content">
        <h3 className="hero-subtitle typewriter">HEY, I'M</h3>
        <h1 className="hero-title cosmic-glow" data-text="Nalin Singh">
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
            href="mailto:nalinsingh2407@gmail.com"
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
