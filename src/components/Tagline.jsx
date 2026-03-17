import { useInView } from './useInView'
import styles from './Tagline.module.css'

export default function Tagline() {
  const [ref, inView] = useInView()
  return (
    <div className={styles.wrap}>
      <p ref={ref} className={`${styles.text} ${inView ? styles.visible : styles.hidden}`}>
        Technology made easy. Get it Done. <span>Badjr.</span>
      </p>
    </div>
  )
}
