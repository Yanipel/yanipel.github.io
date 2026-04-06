import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRight,
  Bot,
  Brain,
  Check,
  CircleDot,
  Clock3,
  CreditCard,
  Globe,
  HandCoins,
  Layers,
  MessageCircle,
  Moon,
  Rocket,
  Sparkles,
  Store,
  Sun,
  Utensils,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import heroAiVideo from '@/assets/hero-ai-first-bg.mp4'
import yanipelLogo from '@/assets/yanipel-logo-officiel-2023.png'

const navItems = [
  { label: 'Offres', href: '#offres' },
  { label: 'Secteurs', href: '#secteurs' },
  { label: 'Méthode', href: '#methode' },
  { label: 'Y.A.N.I.', href: '#yani' },
  { label: 'FAQ', href: '#faq' },
]

const sectors = [
  {
    icon: Store,
    title: 'Commerce de proximité',
    text: 'Click & collect, fiche produits, avis clients et campagnes locales pour générer du trafic en magasin.',
  },
  {
    icon: Utensils,
    title: 'Restauration',
    text: 'Menus dynamiques, réservations, commandes et automatisations pour réduire les appels manqués.',
  },
  {
    icon: Globe,
    title: 'Vente en ligne',
    text: 'Tunnel de vente optimisé, paiement en ligne, relance panier et programme fidélité connecté à YaniPay.',
  },
]

const pillars = [
  {
    icon: Rocket,
    title: 'Livraison 100x plus rapide',
    text: 'De la maquette à la mise en ligne en quelques jours grâce à un workflow AI-first structuré.',
  },
  {
    icon: Brain,
    title: 'Stratégie marque + conversion',
    text: 'Positionnement, identité visuelle, copywriting et parcours d\'achat orientés résultats.',
  },
  {
    icon: CreditCard,
    title: 'Synergie native avec YaniPay',
    text: 'Paiements, services bancaires et fidélisation intégrés sans passer par une stack complexe.',
  },
  {
    icon: Bot,
    title: 'Agent autonome Y.A.N.I.',
    text: 'Prise de RDV, qualification et relances prospects automatisées pour accélérer la croissance.',
  },
]

const processSteps = [
  {
    title: 'Audit express (J0)',
    text: 'Positionnement, objectifs business, priorités d\'acquisition et architecture du site.',
  },
  {
    title: 'Prototype IA (J1-J2)',
    text: 'Design system, pages clés, contenu optimisé SEO local et parcours mobile-first.',
  },
  {
    title: 'Production (J3-J5)',
    text: 'Développement React, intégration paiement/fidélité YaniPay et automatisations n8n.',
  },
  {
    title: 'Lancement (J6-J7)',
    text: 'Recette, analytics, formation rapide et plan d\'amélioration continue.',
  },
]

const pricing = [
  {
    plan: 'Site Vitrine',
    price: '500€',
    subtitle: 'Single-page',
    items: ['Design sur mesure', 'SEO local de base', 'Formulaire de contact', 'Livraison rapide'],
    highlight: false,
  },
  {
    plan: 'Site E-commerce',
    price: '1200€',
    subtitle: 'Multi-page + paiements',
    items: [
      'Catalogue et fiches produits',
      'Paiement en ligne',
      'Base fidélisation YaniPay',
      'Parcours de commande optimisé',
    ],
    highlight: true,
  },
  {
    plan: 'Automatisation IA',
    price: '299€/mois',
    subtitle: 'À partir de',
    items: ['Workflows n8n', 'Agent Y.A.N.I. RDV/prospection', 'Relances automatiques', 'Tableau de suivi'],
    highlight: false,
  },
]

const faq = [
  {
    q: 'Combien de temps pour lancer mon site ?',
    a: 'La majorité des projets vitrine sont publiés en moins d\'une semaine. Les projets e-commerce demandent souvent une à deux semaines selon le volume produits.',
  },
  {
    q: 'Le paiement et la fidélisation sont-ils inclus ?',
    a: 'Oui, la collaboration avec YaniPay permet d\'intégrer un socle bancaire/paiement/fidélité dès le départ, puis de le faire évoluer.',
  },
  {
    q: 'Puis-je démarrer simple puis évoluer ?',
    a: 'Oui. Vous pouvez commencer avec une page vitrine puis passer en e-commerce, automatisation et acquisition progressive.',
  },
  {
    q: 'Proposez-vous du sur-mesure ?',
    a: 'Oui. Si vous avez des besoins spécifiques (booking, marketplace, CRM, API métiers), Yanipel crée une offre dédiée.',
  },
]

const institutionalPartners = [
  { name: 'Europe', sigle: 'EU' },
  { name: 'France Gouvernement', sigle: 'FR' },
  { name: 'La Région Réunion', sigle: '974' },
  { name: 'La French Tech', sigle: 'FT' },
  { name: 'Réunion Innovation', sigle: 'RI' },
  { name: 'Technopole La Réunion', sigle: 'TLR' },
  { name: 'CCI Réunion', sigle: 'CCI' },
  { name: 'CPME Réunion', sigle: 'CPME' },
  { name: 'MEDEF Réunion', sigle: 'MEDEF' },
]

type LeadFormData = {
  fullName: string
  email: string
  phone: string
  offer: string
  message: string
}

const initialLeadForm: LeadFormData = {
  fullName: '',
  email: '',
  phone: '',
  offer: 'Site Vitrine - 500€',
  message: '',
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: index * 0.08,
    },
  }),
}

function App() {
  const [leadForm, setLeadForm] = useState<LeadFormData>(initialLeadForm)
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined
  const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? '262000000000'

  useEffect(() => {
    const root = document.documentElement
    const stored = window.localStorage.getItem('yanipel-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light'
    root.classList.toggle('dark', initialTheme === 'dark')
    setTheme(initialTheme)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('yanipel-theme', theme)
  }, [theme])

  const whatsappHref = useMemo(() => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '')
    const text = `Bonjour Yanipel, je souhaite discuter de l'offre ${leadForm.offer}.`
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`
  }, [leadForm.offer, whatsappNumber])

  const handleFieldChange = (field: keyof LeadFormData, value: string) => {
    setLeadForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTheme = () => {
    setTheme((previousTheme) => (previousTheme === 'dark' ? 'light' : 'dark'))
  }

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!leadForm.fullName.trim() || !leadForm.email.trim() || !leadForm.offer.trim()) {
      setSubmitState('error')
      setSubmitMessage('Merci de remplir au moins votre nom, email et offre.')
      return
    }

    if (!webhookUrl) {
      setSubmitState('error')
      setSubmitMessage('Webhook n8n non configuré. Ajoutez VITE_N8N_WEBHOOK_URL dans .env.')
      return
    }

    setSubmitState('loading')
    setSubmitMessage('')

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          source: 'yanipel-landing',
          submittedAt: new Date().toISOString(),
          channel: 'website-form',
        }),
      })

      if (!response.ok) {
        throw new Error(`Webhook error ${response.status}`)
      }

      setSubmitState('success')
      setSubmitMessage('Merci, votre demande est envoyée. Nous revenons vers vous sous 24h.')
      setLeadForm(initialLeadForm)
    } catch {
      setSubmitState('error')
      setSubmitMessage('Échec de l’envoi. Vérifiez la configuration n8n ou réessayez.')
    }
  }

  return (
    <div className="relative overflow-x-clip bg-background text-foreground transition-colors noise-layer">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="section-shell flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center">
            <img src={yanipelLogo} alt="Yanipel logo officiel" className="h-10 w-auto object-contain" />
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-semibold text-foreground/80 transition hover:text-primary">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-10 w-10 rounded-full border border-border/70 bg-background/80 p-0"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
              title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button asChild size="sm">
              <a href="#contact">Réserver un call</a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-grid relative isolate overflow-hidden min-h-[calc(100svh-4rem)]">
          <video
            className="absolute inset-0 block h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={yanipelLogo}
            aria-hidden="true"
          >
            <source src={heroAiVideo} type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/75 via-emerald-900/45 to-black/65" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.22),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.18),transparent_40%)]" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="pointer-events-none absolute -left-24 top-20 h-52 w-52 rounded-full bg-primary/35 blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.35, delay: 0.15 }}
            className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
          />

          <div className="section-shell relative z-10 flex min-h-[calc(100svh-4rem)] items-end py-16 sm:py-24">
            <motion.div initial="hidden" animate="show" className="max-w-4xl">
              <motion.div custom={0} variants={fadeUp}>
                <Badge variant="accent" className="mb-5 border-white/35 bg-white/10 text-white">
                  Agence web AI-first à La Réunion · Vidéo immersive
                </Badge>
              </motion.div>
              <motion.h1
                custom={1}
                variants={fadeUp}
                className="headline-font text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Votre site internet
                <span className="text-emerald-300"> 100x plus rapidement </span>
                qu&apos;avant.
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                Yanipel conçoit et lance des expériences web performantes pour particuliers, entrepreneurs et professionnels locaux. En partenariat avec YaniPay,
                nous relions création, paiement, fidélisation et automatisation IA dans une seule exécution.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <a href="#offres">
                    Voir les tarifs <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg" className="bg-white/10 text-white ring-white/35 hover:bg-white/20">
                  <a href="#methode">Découvrir la méthode</a>
                </Button>
              </motion.div>
              <motion.div custom={4} variants={fadeUp} className="mt-10 grid gap-3 sm:grid-cols-3">
                {['Offres transparentes', 'Workflow AI + n8n', 'Stack React moderne'].map((item) => (
                  <div key={item} className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-center text-sm font-medium text-white/90 backdrop-blur">
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell pb-8" id="secteurs">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <motion.div custom={0} variants={fadeUp} className="mb-8 flex items-center justify-between">
              <div>
                <Badge className="mb-3">Secteurs prioritaires</Badge>
                <h2 className="headline-font text-3xl font-bold sm:text-4xl">Pensé pour vos usages terrain</h2>
              </div>
            </motion.div>
            <div className="grid gap-5 md:grid-cols-3">
              {sectors.map((sector, index) => (
                <motion.div key={sector.title} custom={index + 1} variants={fadeUp}>
                  <Card className="h-full">
                    <sector.icon className="mb-4 size-8 text-primary" />
                    <CardTitle>{sector.title}</CardTitle>
                    <CardDescription className="mt-3">{sector.text}</CardDescription>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="section-shell py-14">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <motion.div custom={0} variants={fadeUp} className="mb-8 max-w-2xl">
              <Badge className="mb-3">Positionnement</Badge>
              <h2 className="headline-font text-3xl font-bold sm:text-4xl">Pourquoi Yanipel surperforme les agences classiques</h2>
              <p className="mt-3 text-foreground/75">Nous avons structuré l'offre pour supprimer les freins les plus courants: délais longs, prix flous, stack fragmentée et faible suivi après mise en ligne.</p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {pillars.map((pillar, index) => (
                <motion.div key={pillar.title} custom={index + 1} variants={fadeUp}>
                  <Card className="h-full">
                    <div className="mb-3 inline-flex rounded-2xl bg-primary/10 p-3">
                      <pillar.icon className="size-5 text-primary" />
                    </div>
                    <CardTitle>{pillar.title}</CardTitle>
                    <CardDescription className="mt-3">{pillar.text}</CardDescription>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="methode" className="section-shell py-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-hidden rounded-[2rem] border border-border bg-primary px-5 py-10 text-background sm:px-9"
          >
            <motion.div custom={0} variants={fadeUp} className="mb-8">
              <Badge variant="accent" className="mb-3 border-white/20 bg-white/10 text-background">
                Méthode de production
              </Badge>
              <h2 className="headline-font text-3xl font-bold sm:text-4xl">7 jours pour passer de l&apos;idée au chiffre d&apos;affaires</h2>
            </motion.div>
            <div className="grid gap-4 md:grid-cols-4">
              {processSteps.map((step, index) => (
                <motion.div key={step.title} custom={index + 1} variants={fadeUp} className="rounded-2xl border border-white/25 bg-white/10 p-5">
                  <p className="mb-2 inline-flex rounded-full border border-white/40 px-2 py-1 text-xs font-bold tracking-wide">Étape {index + 1}</p>
                  <h3 className="headline-font text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-background/85">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="yani" className="section-shell py-14">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div custom={0} variants={fadeUp}>
              <Card className="h-full bg-gradient-to-br from-accent/15 via-white to-primary/5">
                <Badge variant="accent" className="mb-4">
                  Agent autonome Y.A.N.I.
                </Badge>
                <h2 className="headline-font text-3xl font-bold sm:text-4xl">Un assistant IA qui ne dort jamais</h2>
                <p className="mt-4 max-w-2xl text-foreground/80">
                  Y.A.N.I. automatise la prise de rendez-vous, la qualification client, les relances et les rappels. Vos prospects reçoivent une réponse rapide, même en dehors des heures d'ouverture.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {['Prise de RDV 24/7', 'Appels prospects intelligents', 'Scénarios n8n sur mesure', 'Synchronisation CRM/agenda'].map((point) => (
                    <div key={point} className="flex items-center gap-2 rounded-xl bg-background/85 px-4 py-3 text-sm font-semibold text-foreground/85">
                      <Check className="size-4 text-primary" />
                      {point}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
            <motion.div custom={1} variants={fadeUp} className="grid gap-5">
              <Card>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/50">Partenariat YaniPay</p>
                <h3 className="headline-font text-2xl font-bold">Banque, paiement et fidélisation dans le même parcours</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">Plus besoin d'assembler plusieurs outils. Yanipel + YaniPay unifient l'encaissement et la rétention client.</p>
              </Card>
              <Card>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/50">Résultats visés</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2"><CircleDot className="size-4 text-accent" />Go-live plus rapide</li>
                  <li className="flex items-center gap-2"><CircleDot className="size-4 text-accent" />Plus de contacts qualifiés</li>
                  <li className="flex items-center gap-2"><CircleDot className="size-4 text-accent" />Cycle de vente raccourci</li>
                </ul>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        <section id="offres" className="section-shell py-14">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <motion.div custom={0} variants={fadeUp} className="mb-8 text-center">
              <Badge className="mb-3">Tarifs simples</Badge>
              <h2 className="headline-font text-3xl font-bold sm:text-4xl">Investissement clair, impact direct</h2>
            </motion.div>
            <div className="grid gap-5 lg:grid-cols-3">
              {pricing.map((offer, index) => (
                <motion.div key={offer.plan} custom={index + 1} variants={fadeUp}>
                  <Card className={offer.highlight ? 'border-primary shadow-glow' : ''}>
                    {offer.highlight && <Badge className="mb-4 bg-primary text-background">Le plus demandé</Badge>}
                    <CardTitle>{offer.plan}</CardTitle>
                    <p className="mt-4 headline-font text-4xl font-extrabold text-primary">{offer.price}</p>
                    <p className="mt-1 text-sm font-semibold text-foreground/60">{offer.subtitle}</p>
                    <ul className="mt-5 space-y-3">
                      {offer.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 w-full" variant={offer.highlight ? 'default' : 'secondary'}>
                      Choisir cette offre
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.p custom={4} variants={fadeUp} className="mt-5 text-center text-sm text-foreground/60">
              Besoin spécifique ? Offre sur-mesure disponible pour projet métier, automatisation avancée ou accompagnement marketing continu.
            </motion.p>
          </motion.div>
        </section>

        <section className="section-shell py-14" id="faq">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
            <motion.div custom={0} variants={fadeUp} className="mb-8 max-w-2xl">
              <Badge className="mb-3">FAQ</Badge>
              <h2 className="headline-font text-3xl font-bold sm:text-4xl">Questions fréquentes</h2>
            </motion.div>
            <div className="grid gap-4 md:grid-cols-2">
              {faq.map((item, index) => (
                <motion.div key={item.q} custom={index + 1} variants={fadeUp}>
                  <Card className="h-full">
                    <h3 className="headline-font text-xl font-bold">{item.q}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/75">{item.a}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="contact" className="section-shell pb-16 pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-border bg-gradient-to-br from-white via-muted/40 to-accent/10 p-8 sm:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <Badge variant="accent" className="mb-4">Lancement immédiat</Badge>
                <h2 className="headline-font text-3xl font-bold sm:text-5xl">Passez en mode AI-first dès cette semaine</h2>
                <p className="mt-4 max-w-xl text-foreground/75">30 minutes pour cadrer votre objectif, choisir votre offre et planifier la mise en production.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <a href={whatsappHref} target="_blank" rel="noreferrer">
                      WhatsApp direct <MessageCircle className="size-4" />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <a href="mailto:contact@yanipel.com">
                      Demander un devis <ArrowRight className="size-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <form onSubmit={handleLeadSubmit} className="rounded-2xl border border-border/70 bg-background/85 p-4">
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground/55">Brief express</p>
                  <div className="grid gap-3">
                    <input
                      type="text"
                      value={leadForm.fullName}
                      onChange={(event) => handleFieldChange('fullName', event.target.value)}
                      placeholder="Nom complet"
                      className="h-11 rounded-xl border border-border/80 bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
                    />
                    <input
                      type="email"
                      value={leadForm.email}
                      onChange={(event) => handleFieldChange('email', event.target.value)}
                      placeholder="Email pro"
                      className="h-11 rounded-xl border border-border/80 bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
                    />
                    <input
                      type="tel"
                      value={leadForm.phone}
                      onChange={(event) => handleFieldChange('phone', event.target.value)}
                      placeholder="Téléphone"
                      className="h-11 rounded-xl border border-border/80 bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
                    />
                    <select
                      value={leadForm.offer}
                      onChange={(event) => handleFieldChange('offer', event.target.value)}
                      className="h-11 rounded-xl border border-border/80 bg-background px-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
                    >
                      <option>Site Vitrine - 500€</option>
                      <option>Site E-commerce - 1200€</option>
                      <option>Automatisation IA - dès 299€/mois</option>
                      <option>Sur-mesure</option>
                    </select>
                    <textarea
                      value={leadForm.message}
                      onChange={(event) => handleFieldChange('message', event.target.value)}
                      placeholder="Objectif principal de votre projet..."
                      rows={4}
                      className="rounded-xl border border-border/80 bg-background px-3 py-2 text-sm outline-none ring-primary/30 transition focus:ring-2"
                    />
                    <Button type="submit" size="lg" disabled={submitState === 'loading'}>
                      {submitState === 'loading' ? 'Envoi...' : 'Envoyer à Yanipel'}
                    </Button>
                    {submitMessage ? (
                      <p className={`text-xs font-medium ${submitState === 'success' ? 'text-primary' : 'text-accent'}`}>{submitMessage}</p>
                    ) : null}
                  </div>
                </form>

                {[
                  { icon: Clock3, label: 'Réponse sous 24h' },
                  { icon: HandCoins, label: 'Tarifs lisibles' },
                  { icon: Sparkles, label: 'Expérience premium' },
                  { icon: Layers, label: 'Évolutif par modules' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3">
                    <item.icon className="size-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <section className="border-y border-border/70 bg-muted/45 py-8">
        <div className="section-shell">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
            Écosystème institutionnel & innovation
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9">
            {institutionalPartners.map((partner) => (
              <div
                key={partner.name}
                className="flex min-h-16 items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-3 py-2 shadow-sm"
                aria-label={partner.name}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold uppercase tracking-[0.06em] text-primary">
                  {partner.sigle}
                </div>
                <p className="text-xs font-semibold leading-snug text-foreground/80">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 pb-10 pt-8">
        <div className="section-shell flex flex-col gap-4 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Yanipel · Agence web AI-first · La Réunion</p>
          <p>En collaboration avec YaniPay · Banque · Paiement · Fidélisation</p>
        </div>
      </footer>
    </div>
  )
}

export default App
