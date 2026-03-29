
import './Skills.css';
import { Rocket } from 'lucide-react';
import {
  SiC,
  SiPython,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiJson,
  SiMongodb,
  SiGit,
  SiFirebase,
  SiVercel,
  SiLinux
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'C', icon: <SiC size={24} /> },
      { name: 'Python', icon: <SiPython size={24} /> },
      { name: 'HTML', icon: <SiHtml5 size={24} /> },
    ]
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: <SiReact size={24} /> },
      { name: 'Next.js', icon: <SiNextdotjs size={24} /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={24} /> },
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs size={24} /> },
      { name: 'JSON', icon: <SiJson size={24} /> },
      { name: 'MongoDB', icon: <SiMongodb size={24} /> }
    ]
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: <SiGit size={24} /> },
      { name: 'Firebase', icon: <SiFirebase size={24} /> },
      { name: 'Vercel', icon: <SiVercel size={24} /> },
      { name: 'Linux', icon: <SiLinux size={24} /> },
      { name: 'Antigravity', icon: <Rocket size={24} /> }
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
        {skillCategories.map((category) => {
          // Duplicate skills enough times to fill ultra-wide screens for smaller categories
          const extendedSkills = [...category.skills, ...category.skills, ...category.skills];

          return (
            <div key={category.title} className="skill-category">
              <h3 className="category-title">{category.title}</h3>

              <div className="skills-marquee-container">
                <div className="skills-marquee-track">
                  <div className="skills-marquee-content">
                    {extendedSkills.map((skill, index) => (
                      <div key={`${skill.name}-1-${index}`} className="skill-card glass-card">
                        <span className="skill-icon text-orange">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="skills-marquee-content" aria-hidden="true">
                    {extendedSkills.map((skill, index) => (
                      <div key={`${skill.name}-2-${index}`} className="skill-card glass-card">
                        <span className="skill-icon text-orange">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
