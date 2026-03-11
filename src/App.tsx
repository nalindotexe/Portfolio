import React, { useEffect } from 'react';
import './index.css';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { SideNav } from './components/SideNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';

function App() {
  const { setElements, entries } = useIntersectionObserver();
  const [activeSection, setActiveSection] = React.useState('hero');

  useEffect(() => {
    // Collect all section elements for the intersection observer
    const sectionElements = Array.from(document.querySelectorAll('section'));
    setElements(sectionElements);
  }, [setElements]);

  useEffect(() => {
    // Update active section in SideNav based on scroll position
    const visibleEntries = entries.filter(entry => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      // If multiple are visible, pick the one that takes up the most screen space
      // For simplicity, just pick the first one matching our threshold
      setActiveSection(visibleEntries[0].target.id);
    }
  }, [entries]);

  return (
    <div className="app-wrapper">
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
