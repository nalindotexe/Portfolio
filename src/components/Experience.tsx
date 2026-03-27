
import './Experience.css';

const experiences = [
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
    date: '2025 - PRESENT',
    responsibilities: [
      'Developed a range of projects from simple scripts to full-stack applications.',
      'Built a AI based Doctor Handwriting ananlyser for post doctor visit help.',
      'Attended a 2 day hackathon and built a working prototype of a product.'
    ]
  },
  {
    title: 'Ameteur Astronomer',
    company: 'Hobbyist',
    date: '2014 - PRESENT',
    responsibilities: [
      'Stargazing and understanding the concepts of the Universe',
      'Learnt the basics of Astrophotography',
      'Discovered a new astoriod in the main asteriod belt as part of AIASC 2021.'
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
