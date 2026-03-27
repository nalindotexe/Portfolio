
import './Skills.css';
import { Database, LayoutTemplate, Server, Settings, Terminal, Code2 } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'C', icon: <Code2 size={24} /> },
      { name: 'Python', icon: <Terminal size={24} /> },
      { name: 'HTML', icon: <Code2 size={24} /> },
    ]
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: <LayoutTemplate size={24} /> },
      { name: 'Next.js', icon: <LayoutTemplate size={24} /> },
      { name: 'Tailwind CSS', icon: <LayoutTemplate size={24} /> },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: <Server size={24} /> },
      { name: 'JSON', icon: <Database size={24} /> },
      { name: 'MongoDB', icon: <Database size={24} /> }
    ]
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: <Settings size={24} /> },
      { name: 'Firebase', icon: <Settings size={24} /> },
      { name: 'Vercel', icon: <Settings size={24} /> },
      { name: 'Linux', icon: <Terminal size={24} /> },
      { name: 'Antigravity', icon: <Settings size={24} /> }
    ]
  }
];

export function Skills() {
  return (
    <section id="skills" className="skills-section fade-in-section">
      <div className="section-header center-header">
        <h3 className="section-subtitle">TECHNICAL ARSENAL</h3>
        <h2 className="section-title text-orange glow-text">SKILLS & TECHNOLOGIES</h2>
      </div>

      <div className="skills-container">
        {skillCategories.map((category) => (
          <div key={category.title} className="skill-category">
            <h3 className="category-title">{category.title}</h3>
            <div className="skills-grid">
              {category.skills.map((skill) => (
                <div key={skill.name} className="skill-card glass-card">
                  <span className="skill-icon text-orange">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
