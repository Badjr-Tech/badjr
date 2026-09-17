// Vercel serverless function: emails for project-request submissions via Brevo.
// The sheet write still happens client-side via Apps Script; this handles notification + confirmation.

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const SENDER = { name: "BaDjR Tech", email: "business@badjrtech.com" };

// Simple in-memory rate limit: 5 requests per IP per 10 minutes (resets on cold start, fine for this volume)
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const windowStart = now - 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter(t => t > windowStart);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const clean = (v, max) => String(v || "").slice(0, max).trim();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return res.status(429).json({ error: "Too many requests. Please try again later." });

  const b = req.body || {};
  // Honeypot: pretend success, send nothing
  if (b.website) return res.status(200).json({ ok: true });

  const name = clean(b.name, 100);
  const email = clean(b.email, 200);
  const message = clean(b.message, 5000);
  if (!name || !message) return res.status(400).json({ error: "Name and project details are required." });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: "Please provide a valid email address." });

  const key = process.env.BREVO_API_KEY;
  if (!key) return res.status(500).json({ error: "Email is not configured." });

  const details =
    `Name: ${name}\nEmail: ${email}\nPhone: ${clean(b.phone, 40) || "—"}\nCompany: ${clean(b.company, 200) || "—"}\n` +
    `Service: ${clean(b.service, 100) || "—"}\nBudget: ${clean(b.budget, 50) || "—"}\nTimeline: ${clean(b.timeline, 50) || "—"}\n\nProject details:\n${message}`;

  const send = (payload) =>
    fetch(BREVO_URL, {
      method: "POST",
      headers: { "api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

  // Notification to BaDjR — must succeed for the request to count as delivered
  const notify = await send({
    sender: SENDER,
    to: [{ email: "business@badjrtech.com", name: "BaDjR Tech" }],
    replyTo: { email, name },
    subject: `New project request: ${name}${b.company ? ` (${clean(b.company, 200)})` : ""}`,
    textContent: details,
  });
  if (!notify.ok) {
    const err = await notify.text();
    console.error("Brevo notify failed:", notify.status, err);
    return res.status(502).json({ error: "We couldn't process your request. Please email business@badjrtech.com." });
  }

  // Confirmation to the client — transactional; best-effort
  try {
    await send({
      sender: SENDER,
      to: [{ email, name }],
      subject: "We received your project request — BaDjR Tech",
      textContent:
        `Hi ${name},\n\nThanks for reaching out to BaDjR Tech! We've received your project request and will review it and get back to you within 24 hours to set up a discovery call.\n\nFeel free to reply to this email with anything you'd like to add.\n\n— Dakotah & Alex\nBaDjR Tech · https://www.badjrtech.com`,
    });
  } catch (e) {
    console.error("Brevo confirmation failed:", e);
  }

  return res.status(200).json({ ok: true });
}
