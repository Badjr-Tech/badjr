import { useState } from 'react'
import { useInView } from './useInView'
import styles from './Contact.module.css'

const services = [
  'Web Design & Development',
  'Digital Tool / SaaS',
  'Custom Solution',
  'Brand & UX Design',
  'API & Integration',
  'Consulting & Strategy',
  'Something else',
]

export default function Contact() {
  const [infoRef, infoIn] = useInView()
  const [formRef, formIn] = useInView()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className={styles.contact}>
      <div ref={infoRef} className={`${styles.info} ${infoIn ? styles.visible : styles.hidden}`}>
        <p className={styles.label}>Get In Touch</p>
        <h2 className={styles.title}>Let's Build<br /><em>Something</em></h2>
        <p className={styles.body}>
          Have a project in mind? A problem that needs solving? We'd love to hear
          from you. Fill out the form and we'll get back to you within one business day.
        </p>
        {[
          { icon: '📧', text: 'hello@badjr.co' },
          { icon: '📍', text: 'Remote-first — working with clients worldwide' },
          { icon: '⏱️', text: 'Response within 24 hours' },
        ].map(d => (
          <div key={d.text} className={styles.detail}>
            <span className={styles.detailIcon}>{d.icon}</span>
            <span>{d.text}</span>
          </div>
        ))}
      </div>

      <div ref={formRef} className={`${styles.formWrap} ${formIn ? styles.visible : styles.hidden}`}>
        {submitted ? (
          <div className={styles.thanks}>
            <span>🦡</span>
            <h3>Message received!</h3>
            <p>Thanks for reaching out. We'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <label>Your Name</label>
              <input name="name" type="text" placeholder="Jane Smith" value={form.name} onChange={handleChange} required />
            </div>
            <div className={styles.group}>
              <label>Email</label>
              <input name="email" type="email" placeholder="jane@yourcompany.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className={styles.group}>
              <label>What do you need?</label>
              <select name="service" value={form.service} onChange={handleChange} required>
                <option value="">Select a service...</option>
                {services.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className={styles.group}>
              <label>Tell us about your project</label>
              <textarea name="message" placeholder="What are you building? What's the challenge?" value={form.message} onChange={handleChange} required />
            </div>
            <button type="submit" className={styles.submit}>Send Message →</button>
          </form>
        )}
      </div>
    </section>
  )
}
