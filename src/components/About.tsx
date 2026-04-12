
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
          I am a curious explorer at heart, driven by a fundamental need to understand how the world and the technology within it operates.
          My journey into software engineering was fueled by this "how it works" mindset, leading me to build robust backends and
          visually captivating frontends that bridge the gap between complex logic and human experience.
        </p>
        <p className="about-text">
          I have a deep seated fascination with space and rocketry, which mirrors my approach to tech:
          I believe in precision, clean code, and building systems capable of reaching new heights.
          Whether I’m architecting a database or crafting an interactive user interface,
          I treat every project like a mission, ensuring every component is "flight ready" and functional.
        </p>

        <p className="about-text">
          When I’m not at my terminal, you’ll likely find me keeping up with the latest rocket launches,
          exploring cutting edge design trends, or diving into open source projects.
          For me, programming isn't just about writing lines of code it’s about satisfying a lifelong curiosity
          and building the tools that power the next frontier.
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
