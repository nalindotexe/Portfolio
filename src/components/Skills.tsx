import React, { useEffect, useRef } from 'react';
import './Skills.css';
import { Rocket } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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

// Core component handles the dragging and auto-scrolling
function DraggableMarquee({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // For auto scroll
  const reqRef = useRef<number>(0);
  const isHovered = useRef(false);
  const lastMouseX = useRef<number | null>(null);

  // Auto Scroll logic
  useEffect(() => {
    const step = () => {
      if (containerRef.current && trackRef.current) {
        if (!isHovered.current) {
          containerRef.current.scrollLeft += 1; // Auto scroll speed
        }

        // Infinite loop constraint
        const maxScroll = containerRef.current.scrollWidth / 2;
        if (containerRef.current.scrollLeft >= maxScroll) {
          containerRef.current.scrollLeft -= maxScroll;
        } else if (containerRef.current.scrollLeft <= 0) {
          // Handle dragging backwards infinitely at all times
          containerRef.current.scrollLeft += maxScroll;
        }
      }
      reqRef.current = requestAnimationFrame(step);
    };

    reqRef.current = requestAnimationFrame(step);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, []);

  // Mouse Hover Events
  const onMouseEnter = (e: React.MouseEvent) => {
    isHovered.current = true;
    lastMouseX.current = e.pageX;
  };

  const onMouseLeave = () => {
    isHovered.current = false;
    lastMouseX.current = null;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isHovered.current) return;
    
    if (lastMouseX.current !== null && containerRef.current) {
      const dx = e.pageX - lastMouseX.current;
      containerRef.current.scrollLeft -= dx * 1.5; // Drag speed multiplier
    }
    lastMouseX.current = e.pageX;
  };

  return (
    <div 
      className="skills-marquee-container"
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <div className="skills-marquee-track" ref={trackRef}>
        <div className="skills-marquee-content">
          {children}
        </div>
        <div className="skills-marquee-content" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

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
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.fromTo(
      '.skill-category',
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: sectionRef });

  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: -5,
      backgroundColor: 'rgba(56, 189, 248, 0.05)',
      borderColor: 'var(--accent-primary)',
      boxShadow: '0 0 8px var(--accent-primary), 0 0 20px var(--accent-strong)',
      duration: 0.3,
      ease: 'power1.inOut'
    });
    
    // Animate inner icon drop-shadow
    const icon = e.currentTarget.querySelector('.skill-icon');
    if (icon) {
      gsap.to(icon, {
        filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.8))',
        duration: 0.3,
        ease: 'power1.inOut'
      });
    }
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      y: 0,
      backgroundColor: 'transparent',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: 'none',
      duration: 0.4,
      ease: 'power1.inOut'
    });
    
    const icon = e.currentTarget.querySelector('.skill-icon');
    if (icon) {
      gsap.to(icon, {
        filter: 'drop-shadow(0 0 5px rgba(56, 189, 248, 0.5))',
        duration: 0.4,
        ease: 'power1.inOut'
      });
    }
  };

  return (
    <section id="skills" className="skills-section" ref={sectionRef}>
      <div className="section-header center-header">
        <h3 className="section-subtitle">TECHNICAL ARSENAL</h3>
        <h2 className="section-title text-orange glow-text">SKILLS & TECHNOLOGIES</h2>
      </div>

      <div className="skills-container">
        {skillCategories.map((category) => {
          // Duplicate heavily so that even ultra-widescreen monitors have enough to scroll
          const extendedSkills = [...category.skills, ...category.skills, ...category.skills, ...category.skills, ...category.skills];

          return (
            <div key={category.title} className="skill-category">
              <h3 className="category-title">{category.title}</h3>

              <DraggableMarquee>
                {extendedSkills.map((skill, index) => (
                  <div 
                    key={`${skill.name}-${index}`} 
                    className="skill-card glass-card"
                    onMouseEnter={handleCardEnter}
                    onMouseLeave={handleCardLeave}
                  >
                    <span className="skill-icon text-orange">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </DraggableMarquee>

            </div>
          );
        })}
      </div>
    </section>
  );
}
