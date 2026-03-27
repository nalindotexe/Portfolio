import { Github, Linkedin, Twitter } from 'lucide-react';
import './Contact.css';

export function Contact() {
  return (
    <section id="contact" className="contact-section fade-in-section">
      <div className="contact-content">
        <h2 className="contact-title text-orange glow-text">
          LET'S BUILD<br />SOMETHING BOLD.
        </h2>

        <p className="contact-text">
          I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open!
        </p>

        <a href="mailto:hello@example.com" className="btn-outline contact-btn">
          SAY HELLO
        </a>

        <div className="social-cards">
          <a href="https://github.com/nalindotexe" target="_blank" rel="noopener noreferrer" className="social-card github">
            <Github size={28} />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com/in/nalindotexe" target="_blank" rel="noopener noreferrer" className="social-card linkedin">
            <Linkedin size={28} />
            <span>LinkedIn</span>
          </a>
          <a href="https://twitter.com/nalindotexe" target="_blank" rel="noopener noreferrer" className="social-card twitter">
            <Twitter size={28} />
            <span>Twitter</span>
          </a>
        </div>
      </div>

      <footer className="footer">
        <p>Built with Antigravity and lots of Coffee.</p>
        <p className="footer-credit">© {new Date().getFullYear()} nalindotexe. All rights reserved.</p>
      </footer>
    </section>
  );
}
