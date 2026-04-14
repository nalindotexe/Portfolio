import React, { useEffect, useRef } from 'react';
import { FaMeteor } from 'react-icons/fa6';
import './index.css';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { SideNav } from './components/SideNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { StarryNight } from './components/StarryNight';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const currentAngle = useRef(90);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return; // Disable custom cursor on mobile to save performance/bugs

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        
        // Only update angle if moving to avoid erratic jumps
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
          const rawAngle = Math.atan2(dy, dx) * (180 / Math.PI) - 135; 
          
          let diff = (rawAngle - currentAngle.current) % 360;
          if (diff < -180) diff += 360;
          if (diff > 180) diff -= 360;
          
          currentAngle.current += diff;

          const asteroid = cursorRef.current.querySelector('.asteroid-cursor') as HTMLElement;
          if (asteroid) {
            asteroid.style.setProperty('--dynamic-angle', `${currentAngle.current}deg`);
          }
        }
      }
      lastPos.current = { x, y };
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .interactive-card, .tag, input, textarea, .skill-card')) {
        cursorRef.current.classList.add('cursor-hovered');
      } else {
        cursorRef.current.classList.remove('cursor-hovered');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    // Initial invisible state
    if (cursorRef.current) {
      cursorRef.current.style.opacity = '1';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div id="custom-cursor" ref={cursorRef} className="custom-cursor" style={{ opacity: 0 }}>
      <FaMeteor className="asteroid-cursor" />
    </div>
  );
}

function App() {
  const { setElements, entries } = useIntersectionObserver();
  const [activeSection, setActiveSection] = React.useState('hero');

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    const sectionElements = Array.from(document.querySelectorAll('section'));
    setElements(sectionElements);
  }, [setElements]);

  useEffect(() => {
    const visibleEntries = entries.filter(entry => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(visibleEntries[0].target.id);
    }
  }, [entries]);

  return (
    <div className="app-wrapper">
      <StarryNight />
      <CustomCursor />
      <div className="viewport-frame"></div>
      
      <div className="app-container">
        <SideNav activeSection={activeSection} />
        
        <main className="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
