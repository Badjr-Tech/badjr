import { useInView } from './useInView'
import styles from './Services.module.css'

const services = [
  { num: '01', icon: '🌐', title: 'Web Design & Development', desc: 'Custom websites built from the ground up — fast, accessible, and designed to convert. From marketing sites to full-scale web apps.' },
  { num: '02', icon: '🛠️', title: 'Digital Tools & SaaS', desc: 'We design and engineer web-based tools that solve real problems. Dashboards, automation platforms, internal systems — built to scale.' },
  { num: '03', icon: '⚙️', title: 'Custom Tech Solutions', desc: 'Have a unique challenge? We scope, design, and build custom software tailored precisely to your workflow and business needs.' },
  { num: '04', icon: '🎨', title: 'Brand & UX Design', desc: 'Visual identity, design systems, and user experience design that makes your product feel inevitable — and unforgettable.' },
  { num: '05', icon: '📡', title: 'API & Integration', desc: 'Connecting your tools, automating your workflows, and building the plumbing that keeps your digital ecosystem running smoothly.' },
  { num: '06', icon: '🚀', title: 'Consulting & Strategy', desc: 'Not sure where to start? We help you define the product, map the tech stack, and build a roadmap that actually makes sense.' },
]

export default function Services() {
  const [headRef, headIn] = useInView()

  return (
    <section id="services" className={styles.services}>
      <div ref={headRef} className={`${styles.head} ${headIn ? styles.visible : styles.hidden}`}>
        <p className={styles.label}>What We Build</p>
        <h2 className={styles.title}>Our <em>Services</em></h2>
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <ServiceCard key={s.num} service={s} delay={i * 80} />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ service, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`${styles.card} ${inView ? styles.cardVisible : styles.cardHidden}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.cardNum}>{service.num}</div>
      <span className={styles.cardIcon}>{service.icon}</span>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <div className={styles.cardLine} />
    </div>
  )
}
