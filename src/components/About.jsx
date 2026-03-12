import { useInView } from './useInView'
import styles from './About.module.css'

const traits = [
  { label: 'Persistent', desc: 'We iterate and perfect until the product is truly right.' },
  { label: 'Inventive', desc: 'Smart systems, elegant architecture, creative design.' },
  { label: 'Bold', desc: 'Nimble and fierce — we punch above our weight.' },
  { label: 'Grounded', desc: 'We dig to the root of your users' real needs.' },
]

const stats = [
  { num: '12+', label: 'Projects shipped and in the wild' },
  { num: '3', label: 'Founders with complementary expertise' },
  { num: '100%', label: 'Custom — no cookie-cutter templates' },
]

export default function About() {
  const [textRef, textIn] = useInView()
  const [vizRef, vizIn] = useInView()

  return (
    <section id="about" className={styles.about}>
      <div ref={textRef} className={`${styles.text} ${textIn ? styles.visible : styles.hidden}`}>
        <p className={styles.label}>About Us</p>
        <h2 className={styles.title}>
          Where Art<br />Meets <em>Algorithm</em>
        </h2>
        <p className={styles.body}>
          BaDjR is built on a simple belief: the best digital products live at the
          intersection of bold creativity and deep engineering. Like the badger —
          persistent, inventive, and fiercely capable — we dig beneath the surface
          to build things that last.
        </p>
        <p className={styles.body}>
          We're a nimble team of designers and developers who care about craft.
          From thoughtful UI design to robust backend architecture, we build with
          intention and iterate until it's right.
        </p>
        <div className={styles.traits}>
          {traits.map(t => (
            <div key={t.label} className={styles.traitCard}>
              <strong>{t.label}</strong>
              <span>{t.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={vizRef} className={`${styles.viz} ${vizIn ? styles.visible : styles.hidden}`}>
        {stats.map((s, i) => (
          <div key={s.num}>
            <div className={styles.statBlock}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
            {i < stats.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </section>
  )
}
