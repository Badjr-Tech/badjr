import styles from './Footer.module.css'

const links = ['About', 'Services', 'Projects', 'Team', 'Contact']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Ba<span>Dj</span>R</div>
      <p className={styles.copy}>© {new Date().getFullYear()} BaDjR. All rights reserved.</p>
      <ul className={styles.links}>
        {links.map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
        ))}
      </ul>
    </footer>
  )
}
