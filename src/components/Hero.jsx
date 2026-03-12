import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const badgerRef = useRef(null)

  useEffect(() => {
    const el = badgerRef.current
    if (!el) return
    let frame
    let t = 0
    const animate = () => {
      t += 0.015
      el.style.transform = `scale(${1 + Math.sin(t) * 0.03})`
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.left}>
        <p className={styles.eyebrow}>Tech Products &amp; Custom Solutions</p>
        <h1 className={styles.h1}>
          Dig Deeper.<br />
          <em>Build</em><br />
          Smarter.
        </h1>
        <p className={styles.sub}>
          BaDjR is a creative tech company building websites, digital tools,
          and custom solutions — with engineering precision and artistic instinct.
        </p>
        <div className={styles.btns}>
          <a href="#projects" className={styles.btnPrimary}>See Our Work</a>
          <a href="#contact" className={styles.btnOutline}>Let's Talk</a>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.badgerWrap} ref={badgerRef}>
          <div className={styles.ring1} />
          <div className={styles.ring2} />
          <div className={styles.core}>
            <span role="img" aria-label="Badger">🦡</span>
          </div>
        </div>
        <p className={styles.wordmarkBg} aria-hidden="true">BADJR</p>
      </div>

      <div className={styles.stripe} />
    </section>
  )
}
