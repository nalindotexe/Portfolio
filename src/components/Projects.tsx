
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projects = [
  {
    title: 'SprintSlides AI',
    description: 'A full-stack Last-Minute Revision platform for students and learners for quick revision of topics and concepts.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Python'],
    github: 'https://github.com/nalindotexe/SprintSlidesAI',
    live: 'https://sprintslides.web.app'
  },
  {
    title: 'WelAware',
    description: 'A basic HTML,CSS build that flags out harmful allergens and common irritants in cosmetic items.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/nalindotexe/WelAware_Prototype',
    live: 'https://nalindotexe.github.io/WelAware_Prototype/'
  },
  {
    title: '"Deco-My-Tree"',
    description: 'A Clone of the site decomytree I made as the original was not working. Used to send Christmas messages to your friends.',
    tags: ['React', 'Node.js', 'Python'],
    github: 'https://github.com/nalindotexe/deco-my-tree',
    live: 'https://deco-my-tree.vercel.app/'
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
