import React, { useEffect, useRef } from 'react';
import './index.css';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { SideNav } from './components/SideNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return; // Disable custom cursor on mobile to save performance/bugs

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
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

  return <div id="custom-cursor" ref={cursorRef} className="custom-cursor" style={{ opacity: 0 }}></div>;
}

function App() {
  const { setElements, entries } = useIntersectionObserver();
  const [activeSection, setActiveSection] = React.useState('hero');

  useEffect(() => {
    const sectionElements = Array.from(document.querySelectorAll('section'));
    setElements(sectionElements);
  }, [setElements]);

  useEffect(() => {
    const visibleEntries = entries.filter(entry => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      setActiveSection(visibleEntries[0].target.id);
    }
  }, [entries]);

  return (
    <div className="app-wrapper">
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
