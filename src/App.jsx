import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
const logo3 = '/assets/3.png';
const djcPartner = '/assets/djc-partner.png';
const nreuvPartner = '/assets/nreuv-partner.png';

const C = {
  bg:      "#fffcf0",
  bgAlt:   "#f7f3e8",
  green:   "#476c2e",
  amber:   "#ffbd5a",
  dark:    "#1a1f14",
  mid:     "#5a6350",
  border:  "#ddd9cc",
  white:   "#ffffff",
  error:   "#d32f2f",
};

function useMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => window.innerWidth < bp);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return mobile;
}

function useFade() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const fade = (v, delay = 0) => ({
  opacity: v ? 1 : 0,
  transform: v ? "translateY(0)" : "translateY(14px)",
  transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
});

function Logo({ size = 26 }) {
  return <img src={logo3} alt="Badjr Logo" style={{ height: size, width: 'auto' }} />;
}
function Divider() { return <div style={{ height: 1, background: C.border }} />; }
function Label({ children, color = C.green }) {
  return <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color, marginBottom: "1rem" }}>{children}</p>;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash]);
  return null;
}

function Nav() {
  const mobile = useMobile();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = () => setOpen(false);
  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: mobile ? "0 1.25rem" : "0 2.5rem", height: 60, background: scrolled || open ? "rgba(255,252,240,0.97)" : C.bg, borderBottom: `1px solid ${scrolled || open ? C.border : "transparent"}`, backdropFilter: scrolled || open ? "blur(12px)" : "none", transition: "border-color 0.3s, background 0.3s" }}>
        <Link to="/#top" style={{ textDecoration: "none" }} onClick={go}><Logo size={208} /></Link>
        {!mobile && (
          <ul style={{ listStyle: "none", display: "flex", alignItems: "center", gap: "2rem", fontFamily: "'DM Sans', sans-serif" }}>
            {["About","Services","AI","Projects","Partners","Team","Contact"].map(l => (
              <li key={l}><Link to={`/#${l.toLowerCase()}`} style={{ fontSize: "0.82rem", color: C.mid, textDecoration: "none", fontWeight: 400 }} onMouseEnter={e=>e.target.style.color=C.dark} onMouseLeave={e=>e.target.style.color=C.mid}>{l}</Link></li>
            ))}
            <li><Link to="/start" style={{ fontSize: "0.82rem", fontWeight: 500, textDecoration: "none", padding: "0.45rem 1.1rem", background: C.green, color: C.white, fontFamily: "'DM Sans', sans-serif" }} onMouseEnter={e=>e.target.style.opacity="0.85"} onMouseLeave={e=>e.target.style.opacity="1"}>Start a project</Link></li>
          </ul>
        )}
        {mobile && (
          <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "flex", flexDirection: "column", gap: 5 }} aria-label="Menu">
            <span style={{ display: "block", width: 22, height: 1.5, background: C.dark, transition: "transform 0.2s, opacity 0.2s", transform: open ? "rotate(45deg) translate(4.5px, 4.5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: C.dark, opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
            <span style={{ display: "block", width: 22, height: 1.5, background: C.dark, transition: "transform 0.2s", transform: open ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none" }} />
          </button>
        )}
      </nav>
      {mobile && open && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, zIndex: 199, background: C.bg, borderBottom: `1px solid ${C.border}`, padding: "1.5rem 1.25rem 2rem", display: "flex", flexDirection: "column" }}>
          {["About","Services","AI","Projects","Partners","Team","Contact"].map(l => (
            <Link key={l} to={`/#${l.toLowerCase()}`} onClick={go} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: C.dark, textDecoration: "none", padding: "0.9rem 0", borderBottom: `1px solid ${C.border}` }}>{l}</Link>
          ))}
          <Link to="/start" onClick={go} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none", padding: "0.85rem 1.25rem", background: C.green, color: C.white, marginTop: "1.25rem", textAlign: "center" }}>Start a project</Link>
        </div>
      )}
    </>
  );
}

const heroPhoto1 = '/assets/pexels-tranmautritam-326514.jpg';
const heroPhoto2 = '/assets/pexels-mizunokozuki-12899153.jpg';
const aboutPhoto = '/assets/pexels-mizunokozuki-12899191.jpg';
const processPhoto = '/assets/pexels-bibekghosh-14553707.jpg';

function Hero() {
  const mobile = useMobile();
  return (
    <section id="top" style={{ background: C.bg, padding: mobile ? "96px 1.25rem 56px" : "130px 2.5rem 90px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1.15fr 0.85fr", gap: mobile ? "2.5rem" : "4rem", alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem", padding: "0.35rem 0.85rem", border: `1px solid ${C.border}`, borderRadius: 999 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "block", flexShrink: 0, animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: C.mid, letterSpacing: "0.06em" }}>AI-enabled software studio · Now taking projects</span>
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: mobile ? "2.6rem" : "clamp(2.8rem, 5.5vw, 4.6rem)", fontWeight: 400, color: C.dark, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Get it Done. Badjr.<br /><span style={{ color: C.green }}>Software, AI &amp; tools<br />built to last.</span>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: mobile ? "1rem" : "1.1rem", lineHeight: 1.75, color: C.mid, maxWidth: 520, marginBottom: "2.25rem" }}>
            BaDjR is a small, fast-moving studio that makes beautiful software — websites, digital tools, and custom builds delivered quickly and efficiently, without agency bloat. Engineering precision, creative instinct, and AI where it actually helps.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link to="/start" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.88rem", textDecoration: "none", padding: "0.75rem 1.6rem", background: C.dark, color: C.white }}>Start a project →</Link>
            <Link to="/#projects" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: "0.88rem", textDecoration: "none", padding: "0.75rem 1.6rem", border: `1px solid ${C.border}`, color: C.dark }}>See our work</Link>
          </div>
        </div>
        <div style={{ position: "relative", display: mobile ? "none" : "block" }}>
          <img src={heroPhoto1} alt="Clean workspace with code on screen" style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: 10, display: "block", boxShadow: "0 20px 50px rgba(26,31,20,0.15)" }} />
          <img src={heroPhoto2} alt="Developer at work" style={{ position: "absolute", bottom: -28, left: -40, width: 190, height: 140, objectFit: "cover", borderRadius: 8, border: `4px solid ${C.bg}`, boxShadow: "0 12px 30px rgba(26,31,20,0.2)" }} />
          <div style={{ position: "absolute", top: 18, right: -14, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "0.6rem 0.9rem", boxShadow: "0 8px 24px rgba(26,31,20,0.12)", fontFamily: "'DM Sans', sans-serif" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: C.green, letterSpacing: "0.12em", textTransform: "uppercase" }}>AI-Accelerated</span>
            <p style={{ fontSize: "0.72rem", color: C.mid, marginTop: 2 }}>Technically backed</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofBar() {
  const [ref, v] = useFade();
  const mobile = useMobile();
  return (
    <>
      <Divider />
      <div ref={ref} style={{ ...fade(v), padding: mobile ? "1.25rem" : "1.75rem 2.5rem", maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        {[
          { n: "6+", l: "Products shipped" },
          { n: "10×", l: "Faster with AI-assisted builds" },
          { n: "24h", l: "Response on new inquiries" },
          { n: "100%", l: "Custom — never templated" },
        ].map(s => (
          <div key={s.l} style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", flex: mobile ? "1 1 45%" : "1 1 auto" }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: mobile ? "1.5rem" : "1.8rem", color: C.green, lineHeight: 1 }}>{s.n}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.mid }}>{s.l}</span>
          </div>
        ))}
      </div>
      <Divider />
    </>
  );
}

function About() {
  const mobile = useMobile();
  const [r1,v1] = useFade();
  const [r2,v2] = useFade();
  return (
    <section id="about" style={{ background: C.bg, padding: mobile ? "64px 1.25rem" : "100px 2.5rem", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? "3rem" : "6rem", alignItems: "start" }}>
        <div ref={r1} style={fade(v1)}>
          <Label>About</Label>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: C.dark, lineHeight: 1.2, marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>Small team.<br />Deep expertise.</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.8, color: C.mid, marginBottom: "1rem" }}>BaDjR is a focused team of designers and engineers. We take on a small number of projects at a time so every client gets our full attention — no hand-offs to junior staff, no bloated process.</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.8, color: C.mid }}>Like our namesake — the badger — we dig beneath the surface. We're not interested in fast, generic work. We want to build things that last.</p>
        </div>
        <div ref={r2} style={fade(v2, mobile ? 0 : 120)}>
          <img src={aboutPhoto} alt="The team collaborating" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 8, marginBottom: "1.5rem", display: "block" }} />
          {[{n:"5+",l:"Projects delivered"},{n:"2",l:"Expert founders"},{n:"100%",l:"Custom, innovative & well-designed"}].map(s => (
            <div key={s.n} style={{ padding: "1.5rem 0", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2.8rem", color: C.green, lineHeight: 1 }}>{s.n}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.mid }}>{s.l}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.border}` }} />
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { title: "Web Design & Development", body: "Custom websites built from scratch — fast, accessible, and crafted to convert. From marketing sites to complex web applications." },
  { title: "Digital Tools & SaaS",     body: "Software that solves real problems. Dashboards, automation platforms, and internal tools built to scale with your business." },
  { title: "White-Label Products & Services", body: "Ready-to-brand platforms and services your company can offer as its own. We build it, you label it — full product quality without the build-from-zero timeline." },
  { title: "Custom Tech Solutions",    body: "Unusual challenge? We scope, design, and engineer solutions tailored precisely to your workflow and requirements." },
  { title: "Brand & UX Design",        body: "Visual identity and user experience design that makes your product feel coherent, considered, and impossible to imitate." },
  { title: "API & Integrations",       body: "We connect your tools, automate repetitive workflows, and build the infrastructure that keeps your stack running smoothly." },
  { title: "Strategy & Consulting",    body: "Not sure where to start? We help you define the right product, choose the right stack, and find where AI APIs, AI-powered websites, and generative tools fit your business — with a roadmap that holds." },
  { title: "AI & Automation", body: "AI APIs, AI-powered websites, generative tools, intelligent assistants, and workflow automation — practical AI built into your product or operations, not hype." },
  { title: "AI Consulting", body: "Hands-on guidance for bringing AI into your business. We audit your workflows, identify the highest-ROI opportunities, pilot the right tools, and train your team to use them well." },
];

function ServiceRow({ s, i, mobile }) {
  const [r,v] = useFade();
  const [hov,setHov] = useState(false);
  return (
    <div ref={r} style={{ ...fade(v, i*50), display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 2fr auto", alignItems: mobile ? "start" : "center", gap: mobile ? "0.4rem" : "3rem", borderBottom: `1px solid ${C.border}`, background: !mobile && hov ? C.bg : "transparent", transition: "background 0.2s, opacity 0.6s ease, transform 0.6s ease", cursor: "default", margin: mobile ? "0" : "0 -2.5rem", padding: mobile ? "1.5rem 0" : "1.5rem 2.5rem" }} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: C.dark }}>{s.title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.7, color: C.mid, marginTop: mobile ? "0.25rem" : 0 }}>{s.body}</p>
    </div>
  );
}

function Services() {
  const mobile = useMobile();
  const [hr,hv] = useFade();
  return (
    <section id="services" style={{ background: C.bgAlt, padding: mobile ? "64px 1.25rem" : "100px 2.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={hr} style={{ ...fade(hv), marginBottom: "2.5rem" }}>
          <Label>Services</Label>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: C.dark, letterSpacing: "-0.01em" }}>What we do</h2>
        </div>
        <Divider />
        {SERVICES.map((s,i) => <ServiceRow key={s.title} s={s} i={i} mobile={mobile} />)}
      </div>
    </section>
  );
}

const AI_CARDS = [
  { title: "AI-accelerated delivery", body: "We build with AI-assisted engineering workflows, so your project ships in weeks instead of months — without cutting corners on quality or review." },
  { title: "AI features in your product", body: "AI APIs, AI-powered websites, and generative tools — chat assistants, smart search, document understanding, content generation. We design and integrate AI features your users actually want." },
  { title: "Workflow automation", body: "We identify the repetitive work eating your team's time and replace it with intelligent automations that run quietly in the background." },
  { title: "AI strategy & readiness", body: "Not sure where AI fits your business? We audit your workflows, find the highest-ROI opportunities, and build a practical adoption roadmap." },
];

function AISection() {
  const mobile = useMobile();
  const [hr,hv] = useFade();
  return (
    <section id="ai" style={{ background: C.dark, padding: mobile ? "64px 1.25rem" : "100px 2.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={hr} style={{ ...fade(hv), marginBottom: "3rem", maxWidth: 640 }}>
          <Label color={C.amber}>AI-Native</Label>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: C.white, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
            AI-accelerated,<br />technically backed.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.75, color: "#a8b09c", marginTop: "1rem" }}>
            We use AI to move fast — but every line is reviewed, confirmed, and secured by a formally trained engineer. Speed from AI, quality from real computer science.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)", gap: "1.25rem" }}>
          {AI_CARDS.map((c, i) => <AICard key={c.title} c={c} i={i} />)}
        </div>
      </div>
    </section>
  );
}

function AICard({ c, i }) {
  const [r,v] = useFade();
  const [hov,setHov] = useState(false);
  return (
    <div ref={r} style={{ ...fade(v, i*70), padding: "1.75rem", border: `1px solid ${hov ? C.amber : "rgba(255,255,255,0.14)"}`, borderRadius: 8, transition: "border-color 0.25s, opacity 0.6s ease, transform 0.6s ease" }} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.1rem", color: C.amber }}>{String(i+1).padStart(2,"0")}</span>
      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 600, color: C.white, margin: "0.75rem 0 0.5rem" }}>{c.title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.7, color: "#a8b09c" }}>{c.body}</p>
    </div>
  );
}

const PROCESS = [
  { step: "01", title: "Discover", body: "A focused discovery call and workflow audit. We learn your business, your users, and what success looks like." },
  { step: "02", title: "Design", body: "Wireframes and visual design you react to early and often — no big reveals, no surprises." },
  { step: "03", title: "Build", body: "AI-accelerated engineering with human review on every line. Weekly demos so you always see progress." },
  { step: "04", title: "Ship & support", body: "We launch, monitor, and stay on. Your product keeps improving after day one." },
];

function Process() {
  const mobile = useMobile();
  const [hr,hv] = useFade();
  return (
    <section id="process" style={{ background: C.bg, padding: mobile ? "64px 1.25rem" : "100px 2.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? "2.5rem" : "5rem", alignItems: "center" }}>
          <div>
            <div ref={hr} style={{ ...fade(hv), marginBottom: "2rem" }}>
              <Label>How we work</Label>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: C.dark, letterSpacing: "-0.01em" }}>A process that holds.</h2>
            </div>
            {PROCESS.map((p, i) => <ProcessRow key={p.step} p={p} i={i} />)}
          </div>
          {!mobile && <img src={processPhoto} alt="Building software with care" style={{ width: "100%", height: 520, objectFit: "cover", borderRadius: 10, display: "block" }} />}
        </div>
      </div>
    </section>
  );
}

function ProcessRow({ p, i }) {
  const [r,v] = useFade();
  return (
    <div ref={r} style={{ ...fade(v, i*60), display: "flex", gap: "1.5rem", padding: "1.25rem 0", borderTop: `1px solid ${C.border}` }}>
      <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", color: C.green, lineHeight: 1.3, flexShrink: 0 }}>{p.step}</span>
      <div>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: C.dark, marginBottom: "0.3rem" }}>{p.title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", lineHeight: 1.7, color: C.mid }}>{p.body}</p>
      </div>
    </div>
  );
}

const SELECTED_PROJECTS = [
  { tag: "Conference Management", title: "PanelList", body: "End-to-end conference management platform. Speaker submissions, scheduling, and attendee coordination — all in one focused, easy-to-use tool.", url: "/start" },
  { tag: "FF&E Procurement", title: "Design Domain", body: "Full-service furniture procurement and design for real estate projects. Sourcing through installation, with 20–40% savings over traditional FF&E firms.", url: "https://www.designdomainllc.com/" },
  { tag: "Education & Community", title: "GroundUp", body: "Affordable housing development courses and community by Dr. Gina Merritt — built on 30+ years and $600M+ of real deals. Course platform, community, and direct access for underrepresented developers.", url: "https://community.drginamerritt.net" },
  { tag: "Education Platform", title: "DJC Studio", body: "A learning platform from DakJen Creative — masterclasses, focused 101s, and 1:1 Studio Sessions for small business owners who want to get stable, professional, and moving. Public storefront paired with a logged-in experience that tracks progress through every course.", url: "https://studio.dakjencreative.com" },
  { tag: "Membership Community", title: "The Wren Club", body: "An exclusive membership community for women entrepreneurs with established businesses. Virtual meetups, in-person events, and a vetted network built for real collaboration — not just connections.", url: "https://www.thewrenclub.com/" },
];

const EXAMPLE_PROJECTS = [
  { title: "Custom Invoicing & Bookkeeping", body: "Automated invoicing, expense tracking, and financial reporting tailored to your business workflow. No more spreadsheets or clunky off-the-shelf tools.", images: ["/assets/examples/badjrpay.png", "/assets/examples/badjrpay-categories.png", "/assets/examples/badjrpay-reports.png", "/assets/examples/badjrpay-books.png", "/assets/examples/badjrpay-categories2.png"] },
  { title: "Client Portal", body: "A branded, secure space where your clients can track progress, share files, approve deliverables, and communicate with your team.", images: ["/assets/examples/ddportal.png", "/assets/examples/dd-portal.png", "/assets/examples/dd-portal2.png", "/assets/examples/dd=portal.png"] },
  { title: "Course Platform", body: "End-to-end learning platform with enrollment, video hosting, progress tracking, and certificates — built to match your brand and pedagogy.", images: ["/assets/examples/gucourses.png", "/assets/examples/gucourses2.png", "/assets/examples/gucourses3.png", "/assets/examples/gucourses4.png", "/assets/examples/gucourses5.png"] },
];

function ProjectRow({ p, i, mobile }) {
  const [r,v] = useFade();
  const [hov,setHov] = useState(false);
  return (
    <a ref={r} href={p.url} target={p.url.startsWith("http") ? "_blank" : undefined} rel={p.url.startsWith("http") ? "noopener noreferrer" : undefined} style={{ ...fade(v, i*50), textDecoration: "none", display: "grid", gridTemplateColumns: mobile ? "1fr" : "160px 1fr auto", alignItems: mobile ? "start" : "center", gap: mobile ? "0.3rem" : "2.5rem", borderBottom: `1px solid ${C.border}`, background: hov ? C.bgAlt : "transparent", transition: "background 0.2s, opacity 0.6s ease, transform 0.6s ease", cursor: "pointer", margin: mobile ? "0" : "0 -2.5rem", padding: mobile ? "1.5rem 0" : "1.5rem 2.5rem" }} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.green, fontWeight: 600 }}>{p.tag}</span>
      <div>
        <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: mobile ? "1.1rem" : "1.2rem", fontWeight: 400, color: C.dark }}>{p.title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.65, color: C.mid, marginTop: "0.3rem" }}>{p.body}</p>
      </div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 500, color: hov ? C.green : C.border, textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s" }}>Visit →</span>
    </a>
  );
}

function Lightbox({ project, onClose }) {
  const mobile = useMobile();
  const [idx, setIdx] = useState(0);
  const images = project.images;
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [images.length, onClose]);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: mobile ? "1rem" : "2rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: 1000, width: "100%", background: C.bg, borderRadius: "12px", overflow: "hidden" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "0.75rem", right: "0.75rem", zIndex: 10, background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Close">&times;</button>
        <div style={{ position: "relative", background: C.dark }}>
          <img src={images[idx]} alt={`${project.title} screenshot ${idx + 1}`} style={{ width: "100%", maxHeight: mobile ? "50vh" : "70vh", objectFit: "contain", display: "block" }} />
          {images.length > 1 && (
            <>
              <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem" }} aria-label="Previous">&#8249;</button>
              <button onClick={() => setIdx(i => (i + 1) % images.length)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", fontSize: "1.2rem" }} aria-label="Next">&#8250;</button>
            </>
          )}
        </div>
        <div style={{ padding: mobile ? "1.25rem" : "1.5rem 2rem" }}>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.4rem", fontWeight: 400, color: C.dark, marginBottom: "0.5rem" }}>{project.title}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: C.mid, marginBottom: "1rem" }}>{project.body}</p>
          {images.length > 1 && (
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
              {images.map((img, i) => (
                <button key={i} onClick={() => setIdx(i)} style={{ flexShrink: 0, width: 72, height: 48, border: i === idx ? `2px solid ${C.green}` : `1px solid ${C.border}`, borderRadius: "4px", overflow: "hidden", cursor: "pointer", padding: 0, background: "none", opacity: i === idx ? 1 : 0.6, transition: "opacity 0.2s, border-color 0.2s" }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExampleCard({ p, i, mobile, onOpen }) {
  const [r,v] = useFade();
  const [hov,setHov] = useState(false);
  return (
    <div ref={r} onClick={() => onOpen(p)} style={{ ...fade(v, i*80), background: C.white, border: `1px solid ${C.border}`, borderRadius: "8px", overflow: "hidden", cursor: "pointer", transition: "transform 0.25s, box-shadow 0.25s, opacity 0.6s ease", transform: hov ? "translateY(-4px)" : "translateY(0)", boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)" }} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      <div style={{ height: mobile ? 160 : 200, overflow: "hidden", background: C.bgAlt }}>
        <img src={p.images[0]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", transition: "transform 0.4s", transform: hov ? "scale(1.03)" : "scale(1)" }} />
      </div>
      <div style={{ padding: mobile ? "1.25rem" : "1.5rem" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 600, color: C.dark, marginBottom: "0.5rem" }}>{p.title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.7, color: C.mid, marginBottom: "0.75rem" }}>{p.body}</p>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", fontWeight: 500, color: hov ? C.green : C.mid, transition: "color 0.2s" }}>Explore →</span>
      </div>
    </div>
  );
}

function Projects() {
  const mobile = useMobile();
  const [hr,hv] = useFade();
  const [er,ev] = useFade();
  const [cr,cv] = useFade();
  const [lightboxProject, setLightboxProject] = useState(null);
  return (
    <section id="projects" style={{ background: C.bg, padding: mobile ? "64px 1.25rem" : "100px 2.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={hr} style={{ ...fade(hv), marginBottom: "2.5rem" }}>
          <Label>Work</Label>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: C.dark, letterSpacing: "-0.01em" }}>Selected projects</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: C.mid, marginTop: "0.75rem", maxWidth: 560 }}>Real products we've designed and built for real clients.</p>
        </div>
        <Divider />
        {SELECTED_PROJECTS.map((p,i) => <ProjectRow key={p.title} p={p} i={i} mobile={mobile} />)}
        <div style={{ marginBottom: "4rem" }} />

        <div ref={er} style={{ ...fade(ev), marginBottom: "2.5rem" }}>
          <Label>What we can build</Label>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 400, color: C.dark, letterSpacing: "-0.01em" }}>Example solutions</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: C.mid, marginTop: "0.75rem", maxWidth: 560 }}>Custom software tailored to your workflow. Here's a taste of what's possible.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)", gap: "1.5rem" }}>
          {EXAMPLE_PROJECTS.map((p,i) => <ExampleCard key={p.title} p={p} i={i} mobile={mobile} onOpen={setLightboxProject} />)}
        </div>

        <div ref={cr} style={{ ...fade(cv), marginTop: "3rem", paddingTop: "2.5rem", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: C.mid }}>Have a project in mind?</p>
          <Link to="/start" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", fontWeight: 500, textDecoration: "none", padding: "0.6rem 1.3rem", background: C.green, color: C.white }}>Let's talk →</Link>
        </div>
      </div>
      {lightboxProject && <Lightbox project={lightboxProject} onClose={() => setLightboxProject(null)} />}
    </section>
  );
}

function Partners() {
  const mobile = useMobile();
  const [hr,hv] = useFade();
  return (
    <section id="partners" style={{ background: C.bgAlt, padding: mobile ? "64px 1.25rem" : "100px 2.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={hr} style={{ ...fade(hv), marginBottom: "2.5rem" }}>
          <Label>Partners</Label>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: C.dark, letterSpacing: "-0.01em" }}>Companies we work with</h2>
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: mobile ? "2rem" : "4rem", flexWrap: "wrap", marginTop: "3.5rem" }}>
           <img src={djcPartner} alt="DJC Partner" style={{ maxHeight: "80px", maxWidth: "220px", objectFit: "contain", filter: "grayscale(100%) opacity(80%)", transition: "filter 0.3s" }} onMouseEnter={e => e.target.style.filter="none"} onMouseLeave={e => e.target.style.filter="grayscale(100%) opacity(80%)"} />
           <img src={nreuvPartner} alt="NREUV Partner" style={{ maxHeight: "80px", maxWidth: "220px", objectFit: "contain", filter: "grayscale(100%) opacity(80%)", transition: "filter 0.3s" }} onMouseEnter={e => e.target.style.filter="none"} onMouseLeave={e => e.target.style.filter="grayscale(100%) opacity(80%)"} />
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  {
    name: "Dakotah Jennifer",
    role: "Co-Founder & CEO",
    bio: "Dakotah Jennifer is a creative strategist and entrepreneur with a decade of experience building brands, businesses, and the systems behind them. She brings hands-on expertise across brand strategy, creative direction, lease-up marketing, fractional brand management, and data-driven content campaigns — with a strong command of turning audience insight into measurable growth. At BaDjR, Dakotah leads business operations, brand, and creative direction, and drives ideation on new services and products. She's the kind of operator who owns the full picture — from positioning to execution to performance — and thrives where strategy and craft have to meet. Beyond BaDjR, Dakotah is the founder and CEO of DakJen Creative LLC, a brand strategy and marketing studio based in New York with an office in Baltimore, and previously served as Chief Creative Officer at Northern Real Estate Urban Ventures. Her work has driven 237% LinkedIn growth for clients, 400+ inquiries in 48 hours for an affordable housing campaign, and applicant qualification rates that exceed industry averages. She holds an MFA in Creative Writing from Columbia University and a BA in English Literature, magna cum laude, from Washington University in St. Louis.",
    photo: "/assets/dakotahj-headshot[80].png",
  },
  {
    name: "Alexander Backfish",
    role: "Co-Founder & CTO",
    bio: "Alexander Backfish is a full-stack software engineer with a track record of building production-grade platforms from the ground up. He brings hands-on expertise across Angular, React, Next.js, Java Spring Boot, NestJS, and PostgreSQL — with a strong command of serverless architecture and AWS cloud deployment. At BaDjR, Alex leads full-stack development, turning complex product visions into clean, scalable systems. He's the kind of engineer who takes ownership — from architecture decisions to deployment pipelines — and thrives in environments where the work actually matters. Beyond BaDjR, Alex is the founder of Sword in Stone, a SaaS company he built entirely solo — designing, developing, testing, and shipping the full platform himself. He holds a B.S. in Computer Science from Colorado State University Global and got his start in engineering at Purdue. He's based in Clayton, North Carolina.",
    photo: "/assets/alex-backfish.png",
  },
];

function TeamMember({ f, i, mobile, avatarColor }) {
  const [r,v] = useFade();
  return (
    <div ref={r} style={{ ...fade(v, i*80), display: "grid", gridTemplateColumns: mobile ? "1fr" : "200px 180px 1fr", alignItems: "start", gap: mobile ? "0.5rem" : "3rem", padding: mobile ? "1.75rem 0" : "2.25rem 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <img src={f.photo} alt={f.name} style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", flexShrink: 0, background: avatarColor }} />
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", fontWeight: 600, color: C.dark }}>{f.name}</p>
          {mobile && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.mid, marginTop: "0.1rem" }}>{f.role}</p>}
        </div>
      </div>
      {!mobile && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: C.mid, paddingTop: "0.1rem" }}>{f.role}</p>}
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.75, color: C.mid, marginTop: mobile ? "0.5rem" : 0 }}>{f.bio}</p>
    </div>
  );
}

function Team() {
  const mobile = useMobile();
  const [hr,hv] = useFade();
  const avatarColors = [C.green, C.dark];
  return (
    <section id="team" style={{ background: C.bgAlt, padding: mobile ? "64px 1.25rem" : "100px 2.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={hr} style={{ ...fade(hv), marginBottom: "2.5rem" }}>
          <Label>Team</Label>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: C.dark, letterSpacing: "-0.01em" }}>The founders</h2>
        </div>
        <Divider />
        {TEAM.map((f,i) => <TeamMember key={f.name} f={f} i={i} mobile={mobile} avatarColor={avatarColors[i]} />)}
      </div>
    </section>
  );
}

const FOUNDER_EMAILS = [
  { name: "Dakotah Jennifer", role: "Co-Founder & CEO", email: "dakotah@badjrtech.com" },
  { name: "Alexander Backfish", role: "Co-Founder & CTO", email: "alexander@badjrtech.com" },
];

const DEPT_EMAILS = [
  { label: "Business",  email: "business@badjrtech.com" },
  { label: "PR",        email: "pr@badjrtech.com" },
  { label: "Marketing", email: "marketing@badjrtech.com" },
  { label: "Support",   email: "support@badjrtech.com" },
  { label: "Finance",   email: "finance@badjrtech.com" },
];

function Contact() {
  const mobile = useMobile();
  const [hr,hv] = useFade();
  const [lr,lv] = useFade();
  const [rr,rv] = useFade();
  const mailLink = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: C.green, textDecoration: "none", fontWeight: 500 };
  return (
    <section id="contact" style={{ background: C.bg, padding: mobile ? "64px 1.25rem" : "100px 2.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={hr} style={{ ...fade(hv), marginBottom: "2.5rem" }}>
          <Label>Contact</Label>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 400, color: C.dark, letterSpacing: "-0.01em" }}>Get in touch</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: C.mid, marginTop: "0.75rem", maxWidth: 560 }}>Reach a founder directly or use the right channel for what you need.</p>
        </div>
        <Divider />
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? "3rem" : "6rem", paddingTop: "3rem" }}>
          <div ref={lr} style={fade(lv)}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.mid, marginBottom: "1.5rem" }}>Founders</p>
            {FOUNDER_EMAILS.map(f => (
              <div key={f.email} style={{ paddingBottom: "1.25rem", marginBottom: "1.25rem", borderBottom: `1px solid ${C.border}` }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: C.dark }}>{f.name}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: C.mid, marginBottom: "0.4rem" }}>{f.role}</p>
                <a href={`mailto:${f.email}`} style={mailLink}>{f.email}</a>
              </div>
            ))}
          </div>
          <div ref={rr} style={fade(rv, mobile ? 0 : 120)}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.mid, marginBottom: "1.5rem" }}>Departments</p>
            {DEPT_EMAILS.map(d => (
              <div key={d.email} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.85rem 0", borderBottom: `1px solid ${C.border}`, gap: "1rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 600, color: C.dark }}>{d.label}</span>
                <a href={`mailto:${d.email}`} style={mailLink}>{d.email}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  const mobile = useMobile();
  return (
    <section style={{ background: C.bg, padding: mobile ? "120px 1.25rem 80px" : "160px 2.5rem 120px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 640, textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: C.green, marginBottom: "1.5rem" }}>404 — Page Not Found</p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", fontWeight: 400, color: C.dark, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          You're in the <em style={{ color: C.green }}>wrong place</em>.
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.7, color: C.mid, maxWidth: 480, margin: "0 auto 2.5rem" }}>
          This page doesn't exist — at least not at BaDjR. Could be a typo, a stale link, or something we moved. Let's get you back on track.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.88rem", textDecoration: "none", padding: "0.7rem 1.5rem", background: C.dark, color: C.white }}>Back to home</Link>
          <Link to="/start" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: "0.88rem", textDecoration: "none", padding: "0.7rem 1.5rem", border: `1px solid ${C.border}`, color: C.dark }}>Start a project →</Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const mobile = useMobile();
  return (
    <>
      <Divider />
      <footer style={{ background: C.bg, padding: mobile ? "1.5rem 1.25rem" : "1.75rem 2.5rem", display: "flex", alignItems: mobile ? "flex-start" : "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", flexDirection: mobile ? "column" : "row" }}>
        <Logo size={22} />
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.border }}>© {new Date().getFullYear()} BaDjR Tech. All rights reserved.</p>
        <ul style={{ listStyle: "none", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {["About","Services","AI","Projects","Partners","Team","Contact"].map(l => (
            <li key={l}><Link to={`/#${l.toLowerCase()}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: C.mid, textDecoration: "none" }}>{l}</Link></li>
          ))}
        </ul>
      </footer>
    </>
  );
}

function CTABand() {
  const mobile = useMobile();
  const [r,v] = useFade();
  return (
    <section style={{ background: C.green, padding: mobile ? "56px 1.25rem" : "80px 2.5rem" }}>
      <div ref={r} style={{ ...fade(v), maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 400, color: C.white, letterSpacing: "-0.01em" }}>Ready to build something that lasts?</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", marginTop: "0.5rem" }}>Tell us what you're imagining — we'll reply within 24 hours.</p>
        </div>
        <Link to="/start" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", padding: "0.85rem 1.8rem", background: C.white, color: C.green, borderRadius: 4, flexShrink: 0 }}>Start a project →</Link>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <About />
      <Services />
      <AISection />
      <Process />
      <Projects />
      <Partners />
      <Team />
      <Contact />
      <CTABand />
    </>
  );
}

const SVC_OPTS = ["Web Design & Development","Digital Tool / SaaS","Custom Solution","Brand & UX Design","API & Integration","Consulting","Something else"];

const SHEETS_URL = "https://script.google.com/macros/s/AKfycbxQ3L2eT7onFkH9GDRkSQP5lB4G3WyMyyoRTSMCru4sWI-bML0uHz6FM6xFQXYbptW5dw/exec";

function StartProjectPage() {
  const mobile = useMobile();
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "",
    service: "", budget: "", timeline: "", message: ""
  });

  const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setSubmitting(false);
    setDone(true);
  };

  const inputStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: C.dark, background: C.white, border: `1px solid ${C.border}`, padding: "0.8rem 1rem", outline: "none", width: "100%", borderRadius: "4px", transition: "border-color 0.15s, box-shadow 0.15s", WebkitAppearance: "none" };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, color: C.dark, display: "block", marginBottom: "0.5rem" };

  return (
    <section style={{ background: C.bg, padding: mobile ? "120px 1.25rem 64px" : "160px 2.5rem 100px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Label>Start a Project</Label>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: C.dark, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
          Tell us about your vision.
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.7, color: C.mid, marginBottom: "3rem", maxWidth: 600 }}>
          Fill out the form below with as much detail as possible. We’ll review your requirements and reach out within 24 hours to set up a discovery call.
        </p>

        {done ? (
          <div style={{ padding: "3rem", background: C.white, border: `1px solid ${C.border}`, borderRadius: "8px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, background: C.green, borderRadius: "50%", margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "2rem", fontWeight: 400, color: C.dark, marginBottom: "0.75rem" }}>Request received.</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: C.mid, marginBottom: "2rem" }}>Thank you for reaching out. We will review your project details and get back to you shortly.</p>
            <Link to="/" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", padding: "0.8rem 1.8rem", background: C.dark, color: C.white, borderRadius: "4px" }}>Return home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem", background: C.white, padding: mobile ? "2rem 1.5rem" : "3rem", border: `1px solid ${C.border}`, borderRadius: "8px" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input name="name" type="text" placeholder="Jane Doe" value={form.name} onChange={ch} required style={inputStyle} onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border} />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={ch} required style={inputStyle} onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={labelStyle}>Phone Number (Optional)</label>
                <input name="phone" type="tel" placeholder="(555) 123-4567" value={form.phone} onChange={ch} style={inputStyle} onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border} />
              </div>
              <div>
                <label style={labelStyle}>Company / Organization</label>
                <input name="company" type="text" placeholder="Acme Corp" value={form.company} onChange={ch} style={inputStyle} onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Primary Service Required *</label>
              <select name="service" value={form.service} onChange={ch} required style={{...inputStyle, color: form.service ? C.dark : C.mid, cursor: "pointer"}}>
                <option value="" disabled hidden>Select a primary service...</option>
                {SVC_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={labelStyle}>Estimated Budget</label>
                <select name="budget" value={form.budget} onChange={ch} style={{...inputStyle, color: form.budget ? C.dark : C.mid, cursor: "pointer"}}>
                  <option value="" disabled hidden>Select budget range...</option>
                  <option value="Under $5k">Under $5k</option>
                  <option value="$5k - $15k">$5k - $15k</option>
                  <option value="$15k - $50k">$15k - $50k</option>
                  <option value="$50k+">$50k+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Desired Timeline</label>
                <select name="timeline" value={form.timeline} onChange={ch} style={{...inputStyle, color: form.timeline ? C.dark : C.mid, cursor: "pointer"}}>
                  <option value="" disabled hidden>Select timeline...</option>
                  <option value="ASAP (within weeks)">ASAP (within weeks)</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Project Details *</label>
              <textarea name="message" placeholder="Describe the problem you're trying to solve or the product you want to build. What are the key features and goals?" value={form.message} onChange={ch} required style={{...inputStyle, minHeight: 160, resize: "vertical"}} onFocus={e=>e.target.style.borderColor=C.green} onBlur={e=>e.target.style.borderColor=C.border} />
            </div>

            <button type="submit" disabled={submitting} style={{ background: submitting ? C.mid : C.dark, color: C.white, border: "none", padding: "1rem 2rem", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: 500, cursor: submitting ? "default" : "pointer", alignSelf: "flex-start", borderRadius: "4px", transition: "background 0.2s", opacity: submitting ? 0.7 : 1 }} onMouseEnter={e=>{ if(!submitting) e.target.style.background=C.green }} onMouseLeave={e=>{ if(!submitting) e.target.style.background=C.dark }}>
              {submitting ? "Submitting..." : "Submit Project Request"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}


export default function App() {
  return (
    <>
      <ScrollToTop />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{background:#fffcf0;overflow-x:hidden;}
        ::placeholder{color:#aaa89a;}
        select option{color:#1a1f14;}
        input,textarea,select{-webkit-appearance:none;}
        *{-webkit-tap-highlight-color:transparent;}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}
      `}</style>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartProjectPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}