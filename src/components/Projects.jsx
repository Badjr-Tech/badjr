import { useInView } from './useInView'
import styles from './Projects.module.css'

const projects = [
  { color: '#0b2d65', icon: '📊', tag: 'SaaS / Dashboard', tagColor: '#0b2d65', title: 'GroveMetrics', desc: 'A real-time analytics dashboard for small business owners — clean data visualization and frictionless onboarding.' },
  { color: '#476c2e', icon: '🛒', tag: 'E-Commerce / Web App', tagColor: '#476c2e', title: 'Marché Local', desc: 'An online marketplace connecting local artisan vendors with buyers — mobile-first, with integrated payments.' },
  { color: '#510069', icon: '🤖', tag: 'Automation / API', tagColor: '#510069', title: 'FlowBridge', desc: 'Custom middleware connecting legacy CRMs with modern SaaS tools — cutting manual data entry by 80%.' },
  { color: '#7a5c00', icon: '🎓', tag: 'EdTech / Platform', tagColor: '#7a5c00', title: 'Cursus', desc: 'A learning management system for independent educators — course builder, student tracking, Stripe billing.' },
  { color: '#363636', icon: '🏢', tag: 'Corporate / Web Design', tagColor: '#363636', title: 'Archform Studio', desc: 'Full website redesign and rebrand for an architecture firm — portfolio galleries, custom CMS, and GSAP animations.' },
  { color: 'transparent', icon: '+', tag: 'Your Project', tagColor: '#ffbd5a', title: 'Could Be Here', desc: 'We're always looking for interesting problems to solve. Tell us what you're building.', cta: true },
]

export default function Projects() {
  const [headRef, headIn] = useInView()

  return (
    <section id="projects" className={styles.projects}>
      <div ref={headRef} className={`${styles.head} ${headIn ? styles.visible : styles.hidden}`}>
        <p className={styles.label}>Our Work</p>
        <h2 className={styles.title}>Featured <em>Projects</em></h2>
      </div>

      <div className={styles.grid}>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={i * 80} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project: p, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`${styles.card} ${p.cta ? styles.ctaCard : ''} ${inView ? styles.cardVisible : styles.cardHidden}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.thumb} style={{ background: p.cta ? 'transparent' : p.color }}>
        <span className={p.cta ? styles.ctaPlus : styles.thumbIcon}>{p.icon}</span>
        {!p.cta && <div className={styles.thumbStripes} />}
      </div>
      <div className={styles.body}>
        <span className={styles.tag} style={{ color: p.tagColor }}>{p.tag}</span>
        <h3 style={p.cta ? { color: 'var(--cream)' } : {}}>{p.title}</h3>
        <p style={p.cta ? { color: 'rgba(255,252,240,0.5)' } : {}}>{p.desc}</p>
        <a href="#contact" className={styles.link} style={{ color: p.cta ? 'var(--amber)' : p.tagColor }}>
          {p.cta ? 'Get in touch' : 'Learn more'} →
        </a>
      </div>
    </div>
  )
}
