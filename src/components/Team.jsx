import { useInView } from './useInView'
import styles from './Team.module.css'

const founders = [
  {
    avatar: '👤',
    bg: '#0b2d65',
    name: 'Alex Rivera',
    title: 'Co-Founder & CEO',
    bio: 'Alex brings 8 years of product strategy experience from the startup world. Obsessed with the moment a complex problem clicks into a simple, elegant solution — she's built three products that reached 100k+ users. She leads vision, partnerships, and client relationships at BaDjR.',
  },
  {
    avatar: '👤',
    bg: '#476c2e',
    name: 'Jordan Okafor',
    title: 'Co-Founder & CTO',
    bio: 'Jordan is a full-stack engineer with a background in distributed systems and a love for clean architecture. He's the one who asks "but does it scale?" — then builds the answer. Ex-infrastructure lead at a Series B fintech startup, Jordan sets BaDjR's technical standards.',
  },
  {
    avatar: '👤',
    bg: '#510069',
    name: 'Sam Chen',
    title: 'Co-Founder & Head of Design',
    bio: 'Sam spent five years as a senior designer at a digital agency before co-founding BaDjR. She believes design is problem-solving dressed beautifully — and that the difference between good and great lives entirely in the details. Sam leads all UX, brand, and creative direction.',
  },
]

export default function Team() {
  const [headRef, headIn] = useInView()

  return (
    <section id="team" className={styles.team}>
      <div ref={headRef} className={`${styles.head} ${headIn ? styles.visible : styles.hidden}`}>
        <p className={styles.label}>The Founders</p>
        <h2 className={styles.title}>Built by <em>People</em><br />Who Care</h2>
        <p className={styles.intro}>
          BaDjR was founded by three builders who believe great tech products require
          both engineering rigor and creative soul. We started with a shared obsession:
          making things that work beautifully.
        </p>
      </div>

      <div className={styles.grid}>
        {founders.map((f, i) => (
          <FounderCard key={f.name} founder={f} delay={i * 120} />
        ))}
      </div>
    </section>
  )
}

function FounderCard({ founder: f, delay }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`${styles.card} ${inView ? styles.cardVisible : styles.cardHidden}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.avatar} style={{ background: f.bg }}>
        <span>{f.avatar}</span>
      </div>
      <h3>{f.name}</h3>
      <span className={styles.founderTitle}>{f.title}</span>
      <p className={styles.bio}>{f.bio}</p>
    </div>
  )
}
