import { useEffect, useRef, useState } from 'react';
import './Experience.css';
import { Rocket } from 'lucide-react';
import { FaMeteor } from 'react-icons/fa6';

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.3 });

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`timeline-item ${isVisible ? 'activated' : ''} ${index % 2 === 0 ? 'left' : 'right'}`}
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

  return (
    <section id="experience" className="experience-section fade-in-section" ref={sectionRef}>
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
