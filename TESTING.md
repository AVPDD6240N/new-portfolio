# CMS Phase 1 acceptance checklist

Do these checks on a *test* Supabase project or development site before any public launch.

## Build / routing

- [ ] `npm install` succeeds, `npm run build` succeeds, and `npm run dev` opens the V3 homepage.
- [ ] Compare Home, About, Projects, Design, Blog and Contact visually with the V3 screenshots in `quality-checks/` at desktop and mobile sizes.
- [ ] Directly loading `/about`, `/design`, `/blog/what-building-with-react-taught-me`, `/admin/login` and `/admin` succeeds after deployment.

## Access-control tests

- [ ] Signed-out user visiting `/admin` is redirected to `/admin/login`.
- [ ] Admin user is created via Supabase Auth and manually added to `portfolio_admins`; login works.
- [ ] A normal Supabase Auth account NOT listed in `portfolio_admins` is denied entry to `/admin`.
- [ ] With a normal account token, direct SQL/API attempts to insert/update/delete `site_settings` or `portfolio_entries` fail.
- [ ] Anonymous callers can fetch only entries where `status='published'`; drafts are not returned.
- [ ] Normal signed-in non-admin callers cannot see draft entries through the Data API.
- [ ] Anonymous or non-admin callers cannot upload, update or delete files in the `portfolio-media` bucket.
- [ ] Frontend files and deployed environment contain NO service_role/secret keys.

## Editing and publication

- [ ] Change the hero intro in Profile & hero. Save; refresh public homepage and confirm new text appears without CSS changes.
- [ ] Update Design page heading, save, and refresh `/design`.
- [ ] Add a **draft** project. Confirm it is hidden from the public page but present in the admin table.
- [ ] Publish it. Confirm it appears after refreshing `/projects`.
- [ ] Upload a JPG from the content editor, save its public URL, verify the image appears.
- [ ] Upload an actual PDF, update the profile CV URL, click the CV navigation button and verify the intended file downloads.
- [ ] Add a blog article with multiple heading/paragraph blocks, publish, open its new `/blog/:slug` route.
- [ ] Test remove/reorder and observe public page changes after refresh.
- [ ] Confirm mobile admin sidebar and dialogs work with a keyboard and a touch device.

## Known Phase 1 limits

No live multi-user preview, automatic content version history, image cropping, automatic backup, contact-form inbox, or fully configurable animation builder. These can be built in Phase 2.
