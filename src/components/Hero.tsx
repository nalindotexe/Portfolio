
import { Github, Linkedin, Mail } from 'lucide-react';
import './Hero.css';

export function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h3 className="hero-subtitle">HEY, I'M</h3>
        <h1 className="hero-title text-orange glow-text">
          Nalin<br />Singh
        </h1>
        <p className="hero-description">
          Aspiring developer specializing in getting it done.
        </p>

        <div className="hero-socials">
          <a href="https://github.com/nalindotexe" target="_blank" rel="noopener noreferrer" className="social-link">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/nalindotexe" target="_blank" rel="noopener noreferrer" className="social-link">
            <Linkedin size={24} />
          </a>
          <a href="mailto:hello@example.com" className="social-link">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}
