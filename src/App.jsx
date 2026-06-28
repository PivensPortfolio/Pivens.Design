import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Zap, Shield, Clock, Star, Check, ChevronDown, Menu, X } from 'lucide-react'
import { formatPhone, emailStatus } from './utils/format'
import { getCookie } from './utils/cookies'

const NTFY_TOPIC = import.meta.env.VITE_NTFY_TOPIC

const FEATURES = [
  {
    icon: Zap,
    title: 'Delivered in Days',
    desc: "Not weeks, not months. I've done this a thousand times — I know exactly what to build and how to build it fast.",
  },
  {
    icon: Shield,
    title: 'One Person. No Handoffs.',
    desc: 'You deal with me directly. No account managers, no junior devs, no crossed wires. One point of contact, start to finish.',
  },
  {
    icon: Clock,
    title: 'No Surprise Invoices',
    desc: "$499 upfront. Add-ons priced clearly before we start. You'll never open an invoice and wonder what you're paying for.",
  },
]

const STEPS = [
  { num: '01', title: 'You reach out', desc: "Fill out the form. I'll text you within 24 hours to learn about your business and what you need." },
  { num: '02', title: 'I design & build', desc: 'I handle everything — design, copy, structure. No templates, no shortcuts, no waiting on a team.' },
  { num: '03', title: 'You review', desc: 'You get two rounds of revisions to make it exactly right. Most clients need one.' },
  { num: '04', title: 'You go live', desc: "I deploy, configure your domain, and you're live — without the six-week wait or the $15,000 bill." },
]

const BASE_INCLUDES = [
  'Home section',
  'About section',
  'Services section',
  'Reviews section',
  'FAQ section',
  'Contact form',
]

const BASIC_ADDONS = [
  'Email list signup',
  'Customer feedback form',
  'Menu or price list',
  'Team / staff directory',
  'Social media feed (Instagram)',
  'Google Reviews embed',
  'Pop-up lead capture',
  'Google Maps + directions',
]

const ADVANCED_ADDONS = [
  'Online booking / appointment scheduling',
  'Live chat widget',
  'Blog (up to 3 starter posts)',
  'Photo gallery',
  'Event calendar',
  'Before & after gallery',
  'Job listings / careers section',
  'Client intake / onboarding form',
]

const WORK = [
  {
    name: 'FreightPath Academy',
    desc: 'CDL training platform — student app, admin console, and marketing site.',
    url: 'https://freightpathacademy.com',
  },
  {
    name: 'Kandi & Co. Cleaning',
    desc: 'Professional cleaning service for Vancouver & Portland — booking-focused site with services, reviews, and FAQ.',
    url: 'https://www.kandiecleaning.com',
  },
  {
    name: "Erwin's Quality Plants",
    desc: 'Family-grown plant nursery in Eugene, OR since 1981 — gallery, seasonal blooms, events, and location.',
    url: 'https://erwins-quality-plants.vercel.app',
  },
  {
    name: 'Savona Coffee House',
    desc: 'Riverfront coffeehouse in Vancouver, WA — espresso, breakfast, ice cream, and outdoor seating on the Columbia.',
    url: 'https://savona-coffeehouse.vercel.app',
    proposal: true,
  },
  {
    name: 'Stardust Diner',
    desc: 'Classic American diner established 1987 — full menu, gallery, and story page with retro neon aesthetic.',
    url: 'https://stardust-diner.vercel.app',
    proposal: true,
  },
]

const TESTIMONIALS = [
  {
    name: 'Marcus T.',
    role: 'Owner, Trident Roofing',
    quote: "I had a site live in four days. Seriously. Four days. My old agency took three months and it still looked broken.",
    stars: 5,
  },
  {
    name: 'Aisha K.',
    role: 'Founder, Luminary Skincare',
    quote: "The design is exactly what I had in my head but couldn't articulate. And it was half the price of every other quote I got.",
    stars: 5,
  },
  {
    name: 'Derek S.',
    role: 'Director, Clearpath Legal',
    quote: "Professional, fast, and he actually answered his texts. Rare. Highly recommend.",
    stars: 5,
  },
]

const TICKER_ITEMS = [
  'Starting at $499',
  'Mobile-First Design',
  'No Hidden Fees',
  'One Point of Contact',
  'Done in Days',
  '30+ Years Experience',
  'Everything on One Page',
  'Built to Perform',
]

const READINESS_OPTIONS = [
  { value: 'ready', label: 'Ready to start', sub: "Let's go" },
  { value: 'deciding', label: 'Deciding soon', sub: 'Within a month' },
  { value: 'exploring', label: 'Just exploring', sub: 'No rush' },
]

const INDUSTRIES = ['Restaurant / Food', 'Retail / Shop', 'Home Services', 'Beauty & Wellness', 'Contractor', 'Healthcare', 'Auto / Repair', 'Other']

function useSectionReveal() {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }
}

function openContactForm() {
  window.dispatchEvent(new CustomEvent('open-contact-form'))
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="overflow-hidden border-y border-border py-4 bg-secondary">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-4 text-sm font-medium tracking-widest uppercase text-muted-foreground">
            <span className="text-accent text-lg">◆</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold text-foreground tracking-tight">
          Pivens<span className="text-accent">.</span>Design
        </a>

        <div className="hidden md:flex items-center gap-10">
          {['Pricing', 'Work', 'About', 'Contact'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={openContactForm}
            className="text-sm px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Get in Touch
          </button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          className="md:hidden bg-card border-t border-border px-6 py-6 flex flex-col gap-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {['Pricing', 'Work', 'About', 'Contact'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-base text-foreground"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); openContactForm() }}
            className="text-sm px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold text-center mt-2"
          >
            Get in Touch
          </button>
        </motion.div>
      )}
    </motion.nav>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const words = ['Look', 'Like', 'the', 'Business', 'You', 'Actually', 'Are.']

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'rgba(181,255,71,0.07)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: 'rgba(181,255,71,0.04)' }} />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div className="relative max-w-7xl mx-auto px-6 w-full" style={{ y }}>
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 text-accent text-xs font-semibold tracking-widest uppercase mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Web Design Studio
        </motion.div>

        <h1 className="font-display text-[clamp(3rem,9vw,9rem)] font-extrabold leading-[0.92] tracking-tighter text-foreground mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block', marginRight: '0.18em' }}
              initial={{ opacity: 0, y: 60, skewY: 4 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.75, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {(word === 'You' || word === 'Actually' || word === 'Are.') ? <span className="text-accent">{word}</span> : word}
            </motion.span>
          ))}
        </h1>

        <div className="flex flex-col md:flex-row md:items-end gap-8 mt-6">
          <motion.p
            className="text-lg text-muted-foreground max-w-md leading-relaxed font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            Fix that in days, not months. Starting at $499.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-accent text-accent-foreground font-bold text-base hover:bg-accent/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(181,255,71,0.25)]"
            >
              See Pricing
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-border text-foreground font-semibold text-base hover:border-accent/50 transition-all duration-300"
            >
              How It Works
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-border max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {[
            { val: '30+', unit: 'yrs', label: 'Designing & building' },
            { val: '$499', unit: '', label: 'Starting price' },
            { val: 'Days', unit: '', label: 'Not months' },
          ].map(s => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-foreground">
                {s.val}<span className="text-accent text-xl">{s.unit}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-body">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  )
}

function Features() {
  const reveal = useSectionReveal()
  return (
    <section id="services" className="py-28 max-w-7xl mx-auto px-6">
      <motion.div {...reveal} className="mb-16">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Why Us</p>
        <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground tracking-tighter">
          Built different.<br />On purpose.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-px bg-border">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            className="group bg-background p-10 hover:bg-card transition-colors duration-300 cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-7 group-hover:bg-accent/20 transition-colors duration-300">
              <f.icon size={22} className="text-accent" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3 tracking-tight">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed font-body text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Process() {
  const reveal = useSectionReveal()
  return (
    <section id="process" className="py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...reveal} className="mb-16">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">The Process</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground tracking-tighter">
            From first text<br />to live in days.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-px bg-border">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="bg-secondary p-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-5xl font-extrabold text-accent/20 mb-6 tracking-tighter">{step.num}</p>
              <h3 className="font-display text-xl font-bold text-foreground mb-3 tracking-tight">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const reveal = useSectionReveal()
  return (
    <section id="pricing" className="py-28 max-w-7xl mx-auto px-6">
      <motion.div {...reveal} className="mb-14">
        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Pricing</p>
        <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground tracking-tighter">
          Simple. Flat.<br />No surprises.
        </h2>
      </motion.div>

      {/* Base price card */}
      <motion.div
        className="rounded-2xl border border-accent bg-card p-8 md:p-12 mb-6 shadow-[0_0_60px_rgba(181,255,71,0.08)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-10">
          <div className="shrink-0">
            <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase font-body mb-2">The Site</p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-7xl font-extrabold text-foreground tracking-tighter">$499</span>
            </div>
            <p className="text-muted-foreground text-sm font-body mt-1">Paid upfront. Add-ons on delivery.</p>
            <button
              onClick={openContactForm}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-bold text-sm hover:bg-accent/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(181,255,71,0.2)]"
            >
              Get Started <ArrowRight size={15} />
            </button>
          </div>

          <div className="flex-1 border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 md:pl-10">
            <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase font-body mb-5">
              What's Included — Everything on one page
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BASE_INCLUDES.map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground font-body">
                  <Check size={13} className="text-accent shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-xs font-body mt-5">Mobile-ready. Delivered in days.</p>
          </div>
        </div>
      </motion.div>

      {/* Add-ons */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          className="rounded-2xl border border-border bg-card p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-baseline gap-3 mb-2">
            <p className="font-display text-lg font-bold text-foreground tracking-tight">Basic Add-ons</p>
            <span className="text-accent font-bold text-sm font-body">+$249 each</span>
          </div>
          <p className="text-muted-foreground text-xs font-body mb-6">Functional extras that most small businesses need.</p>
          <ul className="grid grid-cols-1 gap-2.5">
            {BASIC_ADDONS.map(item => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground font-body">
                <span className="text-accent text-xs">+</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-border bg-card p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-baseline gap-3 mb-2">
            <p className="font-display text-lg font-bold text-foreground tracking-tight">Advanced Add-ons</p>
            <span className="text-accent font-bold text-sm font-body">+$499 each</span>
          </div>
          <p className="text-muted-foreground text-xs font-body mb-6">More complex features built right into your single page.</p>
          <ul className="grid grid-cols-1 gap-2.5">
            {ADVANCED_ADDONS.map(item => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground font-body">
                <span className="text-accent text-xs">+</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.p
        className="text-muted-foreground text-sm font-body mt-5 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Don't see what you need? Ask — if it can be built into a single page, I can price it.
      </motion.p>
    </section>
  )
}

function Work() {
  const reveal = useSectionReveal()
  return (
    <section id="work" className="py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...reveal} className="mb-16">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Recent Work</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground tracking-tighter">
            Built to perform.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {WORK.map((project, i) => (
            <motion.div
              key={project.name}
              className="bg-secondary p-8 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-display text-xl font-bold text-foreground tracking-tight">{project.name}</h3>
                {project.proposal && (
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--color-accent)', border: '1px solid var(--color-accent)', padding: '2px 7px', borderRadius: 3, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Design Proposal
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">{project.desc}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent text-xs font-bold tracking-wider uppercase group-hover:gap-3 transition-all duration-200"
              >
                {project.proposal ? 'View Design' : 'View Live Site'} <ArrowRight size={13} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const reveal = useSectionReveal()
  return (
    <section id="about" className="py-28 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div {...reveal}>
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">About</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground tracking-tighter mb-6">
            One person.<br />No handoffs.
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            30+ years designing and building. I work fast because I've done this a thousand times.
            One person means one point of contact, no agency layers, and no surprises on the bill.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            You get a professional site built the right way, without the six-week timeline or the $15,000 invoice.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { val: '30+', label: 'Years of experience' },
            { val: '$499', label: 'Starting price' },
            { val: 'Days', label: 'Not weeks or months' },
            { val: '1', label: 'Point of contact — me' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-2xl p-6">
              <p className="font-display text-4xl font-extrabold text-accent tracking-tighter">{s.val}</p>
              <p className="text-muted-foreground text-sm font-body mt-2">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Testimonials() {
  const reveal = useSectionReveal()
  return (
    <section className="py-28 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...reveal} className="mb-16">
          <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">Client Stories</p>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground tracking-tighter">
            Real businesses.<br />Real results.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-card border border-border rounded-2xl p-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} size={14} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-foreground font-body text-base leading-relaxed mb-7 italic">"{t.quote}"</p>
              <div>
                <p className="font-display font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs font-body mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactWizard() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [sendStatus, setSendStatus] = useState('idle')
  const [name, setName] = useState('')
  const [business, setBusiness] = useState('')
  const [industry, setIndustry] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [readiness, setReadiness] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handler = () => {
      setOpen(true)
      setStep(1)
      setDir(1)
      setSubmitted(false)
      setSendStatus('idle')
    }
    window.addEventListener('open-contact-form', handler)
    return () => window.removeEventListener('open-contact-form', handler)
  }, [])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function advance() {
    setDir(1)
    setStep(s => Math.min(s + 1, 6))
  }

  function retreat() {
    setDir(-1)
    if (step > 1) setStep(s => s - 1)
    else setOpen(false)
  }

  async function submit() {
    setSendStatus('sending')
    const variant = getCookie('pv_hero') ?? 'new'
    const readinessLabel = {
      ready: 'Ready to start',
      deciding: 'Deciding soon',
      exploring: 'Just exploring',
    }[readiness] ?? readiness

    const body = [
      `📱 ${phone || '—'}`,
      `🏢 ${business || '—'}`,
      `✉️  ${email || '—'}`,
      `🌐 ${website || '—'}`,
      `🏷️ ${industry || '—'}`,
      `⏱️  ${readinessLabel || '—'}`,
      `🧭 Hero variant: ${variant}`,
      '',
      message,
    ].join('\n')

    try {
      const res = await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
        method: 'POST',
        headers: {
          'Title': `New Lead: ${name || 'Anonymous'}`,
          'Priority': 'high',
          'Tags': 'raising_hand,pivens',
          'Content-Type': 'text/plain',
        },
        body,
      })
      if (!res.ok) throw new Error(`ntfy ${res.status}`)
      if (typeof window.plausible === 'function') {
        window.plausible('Lead', { props: { variant } })
      }
      setSubmitted(true)
    } catch {
      setSendStatus('error')
    }
  }

  if (!open) return null

  const monoStyle = { fontFamily: "'IBM Plex Mono', monospace" }
  const pillCls = 'border-4 border-black rounded-full h-24 md:h-[100px] px-8 text-2xl md:text-[40px] font-semibold text-black placeholder:text-black/30 bg-transparent focus:outline-none w-full font-display tracking-tight'
  const labelEl = txt => (
    <span className="text-xs font-bold tracking-widest uppercase text-black" style={monoStyle}>{txt}</span>
  )

  const stepMap = {
    1: (
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-[clamp(48px,7vw,80px)] font-extrabold text-black uppercase leading-[0.9] tracking-tight">
            <span className="block">WHAT'S</span>
            <span className="block">YOUR NAME?</span>
          </h1>
          <p className="text-black/60 text-lg font-body max-w-lg leading-relaxed">
            We'll use this to personalize your experience.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {labelEl('YOUR NAME')}
          <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && name && advance()}
            placeholder="Type your full name" className={pillCls} />
        </div>
      </div>
    ),
    2: (
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-[clamp(40px,6vw,80px)] font-extrabold text-black uppercase leading-[0.9] tracking-tight">
            <span className="block">WHAT'S YOUR</span>
            <span className="block">BUSINESS CALLED?</span>
          </h1>
          <p className="text-black/60 text-lg font-body max-w-lg leading-relaxed">
            We'll use this to set up your workspace. You can change it later.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            {labelEl('BUSINESS NAME')}
            <input autoFocus type="text" value={business} onChange={e => setBusiness(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && advance()}
              placeholder="Type your business name" className={pillCls} />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              {labelEl('INDUSTRY OR CATEGORY')}
              <p className="text-black text-lg font-semibold font-display">Which category describes you best?</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {INDUSTRIES.map(ind => (
                <button key={ind} type="button" onClick={() => setIndustry(ind === industry ? '' : ind)}
                  className={`px-6 py-3 rounded-full border-2 border-black text-sm font-semibold font-display transition-colors ${
                    industry === ind ? 'bg-black text-[#c5f53a]' : 'bg-transparent text-black hover:bg-black/8'
                  }`}>
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-[clamp(48px,7vw,80px)] font-extrabold text-black uppercase leading-[0.9] tracking-tight">
            <span className="block">WHAT'S YOUR</span>
            <span className="block">PHONE NUMBER?</span>
          </h1>
          <p className="text-black/60 text-lg font-body max-w-lg leading-relaxed">
            I'll reach out within 24 hours.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {labelEl('PHONE NUMBER')}
          <input autoFocus type="tel" value={phone}
            onChange={e => setPhone(formatPhone(e.target.value))}
            onKeyDown={e => e.key === 'Enter' && phone && advance()}
            placeholder="(555) 555-5555" className={pillCls} />
        </div>
      </div>
    ),
    4: (
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-[clamp(48px,7vw,80px)] font-extrabold text-black uppercase leading-[0.9] tracking-tight">
            <span className="block">WHAT'S</span>
            <span className="block">YOUR EMAIL?</span>
          </h1>
          <p className="text-black/60 text-lg font-body max-w-lg leading-relaxed">
            Optional — only if you'd prefer email over text.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {labelEl('EMAIL ADDRESS (OPTIONAL)')}
          <input autoFocus type="email" value={email} onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && advance()}
            placeholder="your@email.com"
            className={pillCls}
            style={{
              outline: emailStatus(email) === 'valid' ? '4px solid #16a34a'
                : emailStatus(email) === 'invalid' ? '4px solid #dc2626'
                : 'none',
              outlineOffset: '2px',
            }} />
        </div>
      </div>
    ),
    5: (
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-[clamp(48px,7vw,80px)] font-extrabold text-black uppercase leading-[0.9] tracking-tight">
            <span className="block">GOT A</span>
            <span className="block">WEBSITE?</span>
          </h1>
          <p className="text-black/60 text-lg font-body max-w-lg leading-relaxed">
            Optional — drop your URL if you have one.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {labelEl('EXISTING WEBSITE (OPTIONAL)')}
          <input autoFocus type="url" value={website} onChange={e => setWebsite(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && advance()}
            placeholder="https://yourwebsite.com" className={pillCls} />
        </div>
      </div>
    ),
    6: (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-[clamp(40px,6vw,80px)] font-extrabold text-black uppercase leading-[0.9] tracking-tight">
            <span className="block">TELL US ABOUT</span>
            <span className="block">YOUR BUSINESS.</span>
          </h1>
          <p className="text-black/60 text-lg font-body max-w-lg leading-relaxed">
            What do you need help with? The more detail, the better.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-3 gap-3">
            {READINESS_OPTIONS.map(opt => (
              <button key={opt.value} type="button"
                onClick={() => setReadiness(readiness === opt.value ? '' : opt.value)}
                className={`flex flex-col items-center justify-center gap-1 h-[88px] p-4 rounded-2xl border-2 border-black transition-colors text-center font-display ${
                  readiness === opt.value ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-transparent text-black hover:bg-black/8'
                }`}>
                <span className="font-bold text-base leading-tight">{opt.label}</span>
                <span className="text-xs font-normal opacity-70">{opt.sub}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {labelEl('ANYTHING ELSE WE SHOULD KNOW?')}
            <textarea rows={5} value={message} onChange={e => setMessage(e.target.value)}
              placeholder="Tell me a bit about your business and what you need"
              className="border-4 border-black rounded-3xl px-8 py-6 text-xl font-semibold text-black placeholder:text-black/30 bg-transparent focus:outline-none w-full font-display resize-none" />
            {sendStatus === 'error' && (
              <p className="text-red-700 text-sm">Something went wrong. Please try again.</p>
            )}
            <p className="text-black/50 text-xs leading-relaxed font-body">
              By submitting this form you agree to be contacted by text message. Message and data rates may apply. Reply STOP at any time to opt out.
            </p>
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden" style={{ backgroundColor: '#c5f53a' }}>
      {/* Decorative corner elements */}
      <svg className="absolute right-[-80px] top-[80px] w-[360px] h-[360px] opacity-[0.12] pointer-events-none" viewBox="0 0 360 360" fill="none">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180
          return <line key={i} x1="180" y1="180" x2={180 + 168 * Math.cos(a)} y2={180 + 168 * Math.sin(a)} stroke="black" strokeWidth="10" strokeLinecap="round" />
        })}
        <circle cx="180" cy="180" r="28" fill="black" />
      </svg>
      <svg className="absolute left-[-64px] bottom-[64px] w-[280px] h-[280px] opacity-[0.12] pointer-events-none" viewBox="0 0 280 280" fill="none">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180
          return <line key={i} x1="140" y1="140" x2={140 + 128 * Math.cos(a)} y2={140 + 128 * Math.sin(a)} stroke="black" strokeWidth="8" strokeLinecap="round" />
        })}
        <circle cx="140" cy="140" r="22" fill="black" />
      </svg>

      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-8 text-center px-10"
        >
          <div className="w-20 h-20 rounded-full bg-black/15 flex items-center justify-center">
            <Check size={36} className="text-black" />
          </div>
          <div>
            <h2 className="font-display text-6xl md:text-7xl font-extrabold text-black uppercase tracking-tight leading-none mb-4">
              Message<br />sent.
            </h2>
            <p className="text-black/60 text-lg">I'll be in touch within 24 hours. Talk soon.</p>
          </div>
          <button onClick={() => setOpen(false)} className="mt-2 text-black/50 underline text-base font-display hover:text-black transition-colors">
            Close
          </button>
        </motion.div>
      ) : (
        <>
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-10 md:px-20 pt-14 pb-4 z-10">
            <button onClick={retreat} className="flex items-center gap-3 text-black hover:opacity-60 transition-opacity">
              <ArrowRight size={20} className="rotate-180" />
              <span className="text-base font-semibold font-display">Back</span>
            </button>
            <div className="flex items-center gap-2" style={monoStyle}>
              <span className="text-sm font-semibold tracking-widest uppercase text-black">STEP</span>
              <span className="text-xl font-bold text-black">{String(step).padStart(2, '0')}</span>
              <span className="text-sm text-black/50">/ 06</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-base font-semibold underline text-black hover:opacity-60 transition-opacity font-display">
              Cancel
            </button>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={{
                initial: d => ({ x: d * 60, opacity: 0 }),
                animate: { x: 0, opacity: 1 },
                exit: d => ({ x: d * -60, opacity: 0 }),
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 pt-[140px] pb-[120px] overflow-y-auto"
            >
              {stepMap[step]}
            </motion.div>
          </AnimatePresence>

          {/* Next / Submit button */}
          <div className="absolute bottom-16 right-10 md:right-20 z-10">
            <button
              onClick={step < 6 ? advance : submit}
              disabled={sendStatus === 'sending'}
              className="flex items-center gap-3 h-16 px-10 rounded-full bg-[#1a1a1a] text-white font-bold text-xl hover:opacity-85 transition-opacity disabled:opacity-60 font-display"
            >
              {sendStatus === 'sending' ? 'Sending...' : (
                <>{step < 6 ? 'Next' : 'Send Message'}<ArrowRight size={18} /></>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function CTA() {
  return (
    <section id="contact" className="py-32 max-w-7xl mx-auto px-6">
      <motion.div
        className="relative rounded-3xl bg-accent overflow-hidden"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative p-14 md:p-20 text-center">
          <p className="text-accent-foreground/70 text-xs font-semibold tracking-widest uppercase mb-4">Get Started</p>
          <h2 className="font-display text-5xl md:text-7xl font-extrabold text-accent-foreground tracking-tighter mb-6">
            Tell me about<br />your business.
          </h2>
          <p className="text-accent-foreground/70 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            I'll text you within 24 hours.
          </p>
          <motion.button
            onClick={openContactForm}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-accent-foreground text-accent font-bold text-base hover:opacity-90 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
            <ArrowRight size={17} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#" className="font-display text-lg font-bold text-foreground tracking-tight">
          Pivens<span className="text-accent">.</span>Design
        </a>

        <div className="flex flex-wrap gap-8 text-sm text-muted-foreground justify-center">
          {['Pricing', 'Work', 'About', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors duration-200">
              {l}
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()} Pivens.Design. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-x-hidden font-body">
      <ContactWizard />
      <Nav />
      <Hero />
      <Ticker />
      <Features />
      <Process />
      <Pricing />
      <Work />
      <About />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
