# Dulmali Nipunika · Portfolio V3 + CMS (Phase 1)

This project **extends the supplied approved Portfolio V3 source**, retaining the public hero artwork, CSS, portrait, and all eight public pages. It adds a secured pastel admin workspace and a Supabase-backed content layer. It is not a separate demo dashboard.

## What's included

- **Public pages kept:** Home, About, Projects, Design Works, Certifications, Volunteering, Blog (with individual article pages), Contact.
- **CMS pages:** `/admin`, `/admin/profile`, `/admin/pages`, `/admin/content/projects`, `/admin/content/designWorks`, `/admin/content/certificates`, `/admin/content/volunteering`, `/admin/content/posts`, `/admin/content/skills`, `/admin/media`.
- **Editing:** publish/draft, add, update, delete, order entries; edit profile, page introductions and social links; upload images/PDFs; edit article section headings and paragraphs.
- **Auth:** password login using Supabase Auth. No signup page. A valid login must ALSO be present in `portfolio_admins` or the admin screen denies entry. RLS enforces authorization for database and file uploads.
- **Local fallback:** without environment variables, the original Portfolio V3 public data still appears and `/admin` explains the Supabase setup. With Supabase configured, the public site uses its published database content.

## 1. Install

Install Node.js 20.19+ or 22.12+ if needed. Open the extracted project in VS Code and run:

```sh
npm install
```

## 2. Create a Supabase project

1. At [supabase.com/dashboard](https://supabase.com/dashboard), create a new project.
2. Under **SQL Editor**, run `supabase/migrations/202610260001_portfolio_cms.sql` (run the whole script exactly once).
3. Then run `supabase/seed.sql` **once** to import existing V3 profile, projects, sample design studies, example blog articles, and skills. This is vital: without the seed, a configured database initially has no portfolio entries.
4. In Supabase **Authentication → Users**, add your own email user and set a strong password through the dashboard. Do **not** create a public signup form for an admin-only portfolio. If using email invites, complete the invitation flow first.
5. Copy the Auth user's **UUID**. In SQL Editor run (replace the placeholder with your real Auth User UUID):

```sql
insert into public.portfolio_admins(user_id)
values ('REPLACE_WITH_YOUR_AUTH_USER_UUID')
on conflict (user_id) do nothing;
```

This is the *only* action that grants edit privileges. Do not grant admin rights automatically on user signup.

## 3. Connect your React app

Copy `.env.example` to `.env.local`, then fill in the project URL and its **publishable (or legacy anon) key** from Supabase Project Settings > API or Connect.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_public_key
```

Use ONLY a publishable/anon key in `VITE_` variables. **Never place a secret, service_role key, or database password in frontend code or `.env.local` intended for client use.** Make sure `.env.local` stays uncommitted.

Restart the dev server when `.env.local` changes.

```sh
npm run dev
```

Open `http://localhost:5173` for the public portfolio and `http://localhost:5173/admin/login` to sign in. Visit `/admin` after login.

## 4. How to edit

- **Profile & hero:** editable name, title, bio, university, links, CV URL, hero artwork, about portrait. The homepage illustration defaults to V3 `public/assets/hero-workspace.webp` until replaced.
- **Page text:** select About / Projects / Design / Certifications / Volunteering / Blog / Contact, then change the heading fields. Leave a field blank to retain V3 original text.
- **Content collections:** create or edit an entry. The slug is generated automatically unless supplied. Choose **Draft** for private work and **Published** to show it publicly. Use arrow controls to change display order.
- **Media:** upload JPG/PNG/WebP/GIF/PDF files up to 10 MB. Copy the public URL or upload directly inside an editor.
- **Blog:** add as many heading/paragraph sections as needed. Content is React text rendering (no raw HTML), reducing XSS risks.
- **Public changes:** reload the public page or navigate to it after publishing; content is fetched from Supabase. This Phase 1 implementation does not offer collaborative live preview or real-time push to already open browser tabs.

## 5. Before going live

1. Replace `public/assets/PORTFOLIO-SUMMARY-DRAFT.pdf` by uploading your real CV and setting its URL under **Profile & hero**.
2. Inspect the imported `designWorks`: initial ones are **example artboards**, not completed commissions. Unpublish or replace before presenting the site as your professional portfolio.
3. Inspect the imported `posts`: these are example articles marked `sample:true` and visibly labeled editorial drafts. Personalize and toggle off **Starter/sample article** when accurate.
4. Add real certifications, volunteering details, project screenshots, and your final social-media URLs.
5. Configure Vercel environment variables exactly as your local `.env.local` (without service keys), then deploy with `npm run build` / `dist`. The included `vercel.json` supports React Router page refreshes.
6. Review authentication settings (disable unnecessary public signup, choose strong password, enable MFA for your admin account if available). Test database RLS with unauthenticated and signed-in non-admin users.
7. Back up database records and media before bulk deletes. **Version history, approval workflows, role management and advanced layout block builders are future phases**, not included yet.

## Source map

- `src/admin/AdminApp.jsx`: private admin routes, auth gate, editors, media and dashboard.
- `src/admin/admin.css`: isolated pastel admin styles.
- `src/cms/supabase.js`: public client, `.env.local` detection.
- `src/cms/PortfolioProvider.jsx`: public published-content fetching and local fallback.
- `supabase/migrations/202610260001_portfolio_cms.sql`: database schema, grants, RLS, storage policies.
- `supabase/seed.sql`: starter V3 content inserted only when no existing rows conflict.
- `scripts/generate-seed.mjs`: re-create the seed from V3 data if you intentionally change defaults.
- `src/data/portfolio.js`: original V3 local fallback / seed source (not the CMS database after connection).

## Limitations and validation status

The source was updated and its file structure verified here, but package installation and an end-to-end authenticated Supabase/Vite browser test could not run in this environment because npm registry access failed (`EAI_AGAIN`). Run `npm install`, `npm run build`, and the security/UX checklist in `TESTING.md` locally before deploying. No Supabase project, users, credentials, or hosted data were created on your behalf.

**Styling:** Tailwind CSS v4 is installed with the Vite plugin but its Preflight reset is **intentionally disabled** to avoid changing the approved V3 layouts. The existing professional CSS remains the visual source of truth; Tailwind utility classes are available for future enhancements.
