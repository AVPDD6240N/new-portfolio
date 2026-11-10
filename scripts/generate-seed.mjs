import fs from 'node:fs';
import * as source from '../src/data/portfolio.js';
const quote = value => `'${JSON.stringify(value).replace(/'/g,"''")}'::jsonb`;
const clean = value => `'${String(value).replace(/'/g,"''")}'`;
const lines = [
  '-- Starter content copied from Portfolio V3. Review the demo designs and example blog posts before launch.',
  '-- Safe to re-run: ON CONFLICT DO NOTHING preserves subsequent admin edits.',
  `insert into public.site_settings(key, value) values ('profile', ${quote({...source.profile,hero_art:'/assets/hero-workspace.webp',about_photo:'/assets/real-portrait.png'})}), ('page_copy', '{}'::jsonb) on conflict (key) do nothing;`,
];
for (const collection of ['projects','designWorks','certificates','volunteering','posts','skills']) {
  for (const [i,item] of source[collection].entries()) {
    const slug = item.slug || item.id || item.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    // The existing site visibly labels illustrative designs and sample articles as examples.
    lines.push(`insert into public.portfolio_entries(collection,slug,data,status,sort_order) values (${clean(collection)},${clean(slug)},${quote(item)},'published',${i*10}) on conflict (collection,slug) do nothing;`);
  }
}
fs.writeFileSync(new URL('../supabase/seed.sql', import.meta.url),lines.join('\n')+'\n');
console.log('Wrote starter seed SQL');
