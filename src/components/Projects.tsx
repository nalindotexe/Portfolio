import { ExternalLink, Github } from 'lucide-react';
import React, { useRef } from 'react';
import type { MouseEvent } from 'react';
import './Projects.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -2; // Reduced from -10 for easier clicking
    const rotateY = ((x - centerX) / centerX) * 2; // Reduced from 10

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.01,
      '--mouse-x': `${x}px`,
      '--mouse-y': `${y}px`,
      duration: 0.1,
      ease: 'power1.out'
    });
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      borderColor: 'var(--accent-primary)',
      boxShadow: 'var(--glow-hover)',
      duration: 0.3,
      ease: 'power1.inOut'
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      '--mouse-x': '50%',
      '--mouse-y': '50%',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: 'none',
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <div
      ref={cardRef}
      className="project-card glass-card interactive-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-spotlight"></div>
      <div className="card-content">
        <h3 className="project-title glitch-hover" data-text={project.title}>{project.title}</h3>
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
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.project-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="section-header">
        <h3 className="section-subtitle">SELECTED WORK</h3>
        <h2 className="section-title text-orange glow-text">FEATURED PROJECTS</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
