
import './Experience.css';

const experiences = [
  {
    title: 'Senior Frontend Engineer',
    company: 'Tech Innovators Inc.',
    date: '2022 - PRESENT',
    responsibilities: [
      'Led the migration of a legacy monolithic frontend to a modern Next.js architecture.',
      'Improved site performance by 40% through lazy loading and optimized assets.',
      'Mentored junior developers and established code review guidelines.'
    ]
  },
  {
    title: 'Full Stack Developer',
    company: 'Creative Solutions',
    date: '2019 - 2022',
    responsibilities: [
      'Developed and maintained RESTful APIs using Node.js and Express.',
      'Built interactive UI components using React and Redux.',
      'Collaborated with designers to ensure pixel-perfect implementations.'
    ]
  },
  {
    title: 'Junior Web Developer',
    company: 'Startup Hub',
    date: '2017 - 2019',
    responsibilities: [
      'Assisted in developing landing pages and marketing sites.',
      'Wrote unit tests and end-to-end tests to ensure application stability.',
      'Participated in daily standups and agile sprints.'
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="experience-section fade-in-section">
      <div className="section-header center-header">
        <h3 className="section-subtitle">CAREER PATH</h3>
        <h2 className="section-title text-orange glow-text">JOURNEY</h2>
      </div>

      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-date">
              <span className="date-tag">{exp.date}</span>
            </div>
            <div className="timeline-content glass-card">
              <h3 className="timeline-title">{exp.title} <span className="text-orange">@ {exp.company}</span></h3>
              <ul className="timeline-responsibilities">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
