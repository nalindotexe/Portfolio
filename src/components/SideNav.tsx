
import './SideNav.css';

interface SideNavProps {
  activeSection: string;
}

const sections = [
  { id: 'hero', label: 'Start' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Contact' }
];

export function SideNav({ activeSection }: SideNavProps) {
  return (
    <nav className="side-nav">
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a 
              href={`#${section.id}`} 
              className={activeSection === section.id ? 'active' : ''}
              aria-label={section.label}
            >
              <span className="nav-label">{section.label}</span>
              <span className="nav-dot"></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
