import { useEffect, useRef, useState } from 'react';
import './Experience.css';
import { Rocket } from 'lucide-react';
import { FaMeteor } from 'react-icons/fa6';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const experiences = [
  {
    title: 'Core Team Member',
    company: 'Algorand Blockchain Club REVA',
    date: '2025 - PRESENT',
    responsibilities: [
      'Organised a 24 Hour blockchain hackathon for 150+ participants.',
      'Currently working on future events and projects on blockchain with the club'
    ]
  },
  {
    title: 'Student Coordinator',
    company: '</DevBraze>',
    date: '2025 - PRESENT',
    responsibilities: [
      'Helped Organise a 14 Hour, 2-day hackathon for 100+ participants.',
      'Helped Organise a 7 Hour Ideathon for 50+ participants',
      'Currently working on future events and projects with the club'
    ]
  },
  {
    title: 'Aspiring Developer',
    company: 'Hobbyist',
    date: '2022 - PRESENT',
    responsibilities: [
      'Developed a range of projects from simple scripts to full-stack applications.',
      'Built an AI based Doctor Handwriting analyser for post doctor visit help.',
      'Attended a 2 day hackathon and built a working prototype of a product.'
    ]
  },
  {
    title: 'Amateur Astronomer',
    company: 'Hobbyist',
    date: '2014 - PRESENT',
    responsibilities: [
      'Stargazing and understanding the concepts of the Universe',
      'Learnt the basics of Astrophotography',
      'Discovered a new asteroid in the main asteroid belt as part of AIASC 2021.'
    ]
  }
];

function TimelineItem({ exp, index }: { exp: typeof experiences[0], index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useGSAP(() => {
    gsap.fromTo(itemRef.current,
      { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          onEnter: () => setIsVisible(true)
        }
      }
    );
  }, { scope: itemRef });

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = e.currentTarget.querySelector('.timeline-node');
    const content = e.currentTarget.querySelector('.timeline-content');

    if (content) {
      gsap.to(content, {
        y: -5,
        borderColor: 'var(--accent-primary)',
        boxShadow: 'var(--glow-hover)',
        backgroundColor: 'rgba(56, 189, 248, 0.03)',
        duration: 0.3,
        ease: 'power1.inOut'
      });
    }

    if (node) {
      gsap.to(node, {
        scale: 1.2,
        borderColor: 'var(--accent-primary)',
        backgroundColor: 'var(--accent-primary)',
        boxShadow: 'var(--glow-hover)',
        duration: 0.3,
        ease: 'power1.inOut'
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = e.currentTarget.querySelector('.timeline-node');
    const content = e.currentTarget.querySelector('.timeline-content');

    if (content) {
      gsap.to(content, {
        y: 0,
        borderColor: 'rgba(56, 189, 248, 0.3)',
        boxShadow: 'none',
        backgroundColor: 'var(--glass-bg)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    if (node) {
      gsap.to(node, {
        scale: 1,
        borderColor: 'var(--accent-primary)',
        backgroundColor: 'var(--bg-color)',
        boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)',
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div
      ref={itemRef}
      className={`timeline-item ${isVisible ? 'activated' : ''} ${index % 2 === 0 ? 'left' : 'right'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="timeline-node"></div>
      <div className="timeline-content glass-card interactive-card">
        <div className="timeline-date">
          <span className="date-tag">{exp.date}</span>
        </div>
        <h3 className="timeline-title">{exp.title} <span className="text-orange">@ {exp.company}</span></h3>
        <ul className="timeline-responsibilities">
          {exp.responsibilities.map((resp, i) => (
            <li key={i}>{resp}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;

      // Calculate progress
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // We want progress to be 0 when the top of the timeline is near the middle of the screen
      const startOffset = viewportHeight * 0.7; 
      const totalDistance = rect.height;
      const scrolled = startOffset - rect.top;
      
      let progress = scrolled / totalDistance;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAtTop = scrollProgress <= 0;
  const isAtBottom = scrollProgress >= 1;

  useGSAP(() => {
    gsap.fromTo(
      '.timeline-item',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      <div className="section-header center-header">
        <h3 className="section-subtitle">CAREER PATH</h3>
        <h2 className="section-title text-orange glow-text">JOURNEY</h2>
      </div>

      <div className="timeline">
        <div className="timeline-beam"></div>
        <div className="timeline-tracker-container">
           <div 
             className={`timeline-ship ${scrollDirection} ${isAtTop ? 'idle-top' : ''} ${isAtBottom ? 'impact-bottom' : ''}`}
             style={{ top: `${scrollProgress * 100}%` }}
           >
             {scrollDirection === 'down' ? (
                <FaMeteor className="ship-icon asteroid-falling" />
             ) : (
                <Rocket className="ship-icon rocket-rising" />
             )}
             {isAtBottom && scrollDirection === 'down' && (
                <div className="impact-crater"></div>
             )}
             {isAtTop && scrollDirection === 'up' && (
                <div className="rocket-exhaust"></div>
             )}
           </div>
        </div>
        {experiences.map((exp, index) => (
          <TimelineItem key={index} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
}
