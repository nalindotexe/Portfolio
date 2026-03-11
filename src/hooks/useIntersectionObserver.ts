import { useEffect, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
      
      // Also add 'is-visible' class to elements directly for CSS animations
      observedEntries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          // Optional: remove if you want them to fade out when scrolling up
          // entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px", // Trigger slightly before it hits the bottom
      ...options
    });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [elements, options]);

  return { setElements, entries };
}
