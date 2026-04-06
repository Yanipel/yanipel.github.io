# Yanipel AI Landing

Landing page React + Vite + Tailwind + Framer Motion pour Yanipel (agence web AI-first à La Réunion).

## Setup

1. Installer les dépendances:

```bash
npm install
```

2. Créer le fichier d'environnement:

```bash
cp .env.example .env
```

3. Configurer:
- `VITE_N8N_WEBHOOK_URL`: URL webhook n8n qui reçoit les leads du formulaire.
- `VITE_WHATSAPP_NUMBER`: numéro WhatsApp au format international sans `+`.

4. Lancer:

```bash
npm run dev
```

## Payload envoyé au webhook

Le formulaire envoie un `POST` JSON contenant:
- `fullName`
- `email`
- `phone`
- `offer`
- `message`
- `source`
- `submittedAt`
- `channel`
