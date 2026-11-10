import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase, isConfigured } from './supabase';
import * as starter from '../data/portfolio';

const ContentContext = createContext(null);
export const collectionKeys = ['projects', 'designWorks', 'certificates', 'volunteering', 'posts', 'skills'];
const defaults = {
  profile: { ...starter.profile, hero_art: '/assets/hero-workspace.webp', about_photo: '/assets/real-portrait.png' },
  pageCopy: {},
  projects: starter.projects,
  designWorks: starter.designWorks,
  certificates: starter.certificates,
  volunteering: starter.volunteering,
  posts: starter.posts,
  skills: starter.skills,
};

export function PortfolioProvider({ children }) {
  const [content, setContent] = useState(defaults);
  const [loading, setLoading] = useState(isConfigured);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    async function load() {
      const [settingsResult, entriesResult] = await Promise.all([
        supabase.from('site_settings').select('key,value').in('key', ['profile', 'page_copy']),
        supabase.from('portfolio_entries').select('collection,slug,data,sort_order').eq('status', 'published').order('sort_order', {ascending: true}).order('created_at', {ascending: true}),
      ]);
      if (!active) return;
      if (settingsResult.error || entriesResult.error) {
        setError(settingsResult.error?.message || entriesResult.error?.message || 'Unable to retrieve portfolio data');
        setLoading(false);
        return;
      }
      const profileRow = settingsResult.data?.find(s => s.key === 'profile');
      const pagesRow = settingsResult.data?.find(s => s.key === 'page_copy');
      const collections = Object.fromEntries(collectionKeys.map(key => [key, []]));
      for (const entry of entriesResult.data ?? []) {
        if (collections[entry.collection]) collections[entry.collection].push({ ...entry.data, id: entry.data.id || entry.slug, slug: entry.slug });
      }
      setContent({
        profile: { ...defaults.profile, ...(profileRow?.value || {}) },
        pageCopy: pagesRow?.value || {},
        ...collections,
      });
      setError('');
      setLoading(false);
    }
    load();
    return () => { active = false; };
  }, []);
  const value = useMemo(() => ({ ...content, loading, error, connected: isConfigured }), [content, loading, error]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
export function usePortfolio() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('usePortfolio must run within PortfolioProvider');
  return ctx;
}
