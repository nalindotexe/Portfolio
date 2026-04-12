import React, { useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Hero.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Elegant Staggered Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    tl.fromTo('.hero-title', 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5 }, 
        "-=0.4"
      )
      .fromTo('.hero-description', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6 }, 
        "-=0.4"
      )
      .fromTo('.social-link', 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 }, 
        "-=0.3"
      );
  }, { scope: containerRef });

  // Shared magnetic hover handler using GSAP
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(e.currentTarget, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      borderColor: 'var(--accent-primary)',
      backgroundColor: 'rgba(56, 189, 248, 0.1)',
      filter: 'drop-shadow(0 0 8px var(--accent-primary)) drop-shadow(0 0 20px var(--accent-strong))',
      color: 'var(--text-primary)',
      duration: 0.3,
      ease: 'power1.inOut'
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.2))',
      color: 'var(--accent-blue)',
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <section id="hero" className="hero-section" ref={containerRef}>
      <div className="hero-content">
        <h3 className="hero-subtitle typewriter">HEY, I'M</h3>
        <h1 className="hero-title cosmic-glow" data-text="Nalin Singh">
          Nalin<br />Singh
        </h1>
        <p className="hero-description">
          Aspiring developer specializing in getting it done.
        </p>

        <div className="hero-socials">
          <a
            href="https://github.com/nalindotexe"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link magnetic"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/nalindotexe"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link magnetic"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:nalinsingh2407@gmail.com"
            className="social-link magnetic"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
