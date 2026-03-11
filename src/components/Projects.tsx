
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    title: 'E-COMMERCE PLATFORM',
    description: 'A full-stack e-commerce solution with real-time inventory management, Stripe payment integration, and an admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    title: 'TASK MANAGER CLI',
    description: 'A blazing fast command-line interface for managing daily tasks, written in Rust with SQLite integration for offline persistence.',
    tags: ['Rust', 'SQLite', 'CLI'],
    github: 'https://github.com',
    live: 'https://example.com'
  },
  {
    title: 'AI CHATBOT',
    description: 'A responsive chatbot interface integrating with OpenAI APIs to provide context-aware customer support for SaaS platforms.',
    tags: ['React', 'Node.js', 'OpenAI API'],
    github: 'https://github.com',
    live: 'https://example.com'
  }
];

export function Projects() {
  return (
    <section id="projects" className="projects-section fade-in-section">
      <div className="section-header">
        <h3 className="section-subtitle">SELECTED WORK</h3>
        <h2 className="section-title text-orange glow-text">FEATURED PROJECTS</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card glass-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Github Repo">
                <Github size={20} />
              </a>
              <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Site">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
