# 3D Freelance Portfolio — Next.js

Premium Apple-inspired portfolio starter for:
- Web Development
- Cybersecurity
- Mobile Apps

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Customize

Edit `components/Portfolio.tsx`:
- your name / studio name
- hero copy
- services
- projects
- skills
- social links

Edit `app/globals.css` for the visual theme.

## 3D

The hero 3D object is in `components/Scene.tsx` using:
- Three.js
- React Three Fiber
- Drei

## Contact form

The form currently gives a client-side success state. Connect it to your preferred API route, Resend, Formspree, or another backend before production.

For Resend, a good next step is:
1. Create `app/api/contact/route.ts`
2. Validate the submitted fields
3. Send the enquiry to your business email
4. Return `{ ok: true }`
5. Change `submit()` in `Portfolio.tsx` to `fetch("/api/contact", ...)`.

## Deploy

This project is compatible with Vercel and most Node.js hosting providers.

```bash
npm run build
npm start
```
