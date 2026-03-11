
import './About.css';

export function About() {
  return (
    <section id="about" className="about-section fade-in-section">
      <div className="section-header">
        <h3 className="section-subtitle">ABOUT</h3>
        <h2 className="section-title text-orange">DYNAMIC DEVELOPER</h2>
      </div>
      
      <div className="about-content">
        <p className="about-text">
          I am a passionate software engineer focused on building robust backends and stunning, interactive frontends. 
          I believe in writing clean code and creating user experiences that are not only functional but visually captivating.
        </p>
        <p className="about-text">
          My journey started with a fascination for how things work on the web, leading me to master a diverse set of technologies across the stack. 
          When I'm not coding, I'm exploring new design trends or contributing to open-source software.
        </p>
        
        <div className="about-actions">
          <a href="/resume.pdf" target="_blank" className="btn-outline">
            DOWNLOAD RESUME
          </a>
        </div>
      </div>
    </section>
  );
}
