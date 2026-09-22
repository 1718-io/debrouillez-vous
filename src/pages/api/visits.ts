import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const configuredSupabaseUrl = import.meta.env.SUPABASE_URL ?? process.env.SUPABASE_URL;
// Supabase JS expects the project root URL and appends /rest/v1 itself.
// Accept a pasted REST URL too, so local setup cannot accidentally produce
// /rest/v1/rest/v1/... requests.
const supabaseUrl = configuredSupabaseUrl?.replace(/\/rest\/v1\/?$/, '');
const supabaseSecretKey =
  import.meta.env.SUPABASE_SECRET_KEY ??
  process.env.SUPABASE_SECRET_KEY ??
  import.meta.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY;

export const GET: APIRoute = async () => {
  if (!supabaseUrl || !supabaseSecretKey) {
    return new Response(JSON.stringify({ error: 'Supabase is not configured.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = createClient(supabaseUrl, supabaseSecretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: stats, error: readError } = await supabase
    .from('site_stats')
    .select('views_count')
    .eq('id', 1)
    .single();

  if (readError || !stats) {
    // A newly connected project may have the table but not its singleton row yet.
    // Seed that row server-side so the first visit can complete normally.
    if (readError?.code === 'PGRST116') {
      const { data: seeded, error: seedError } = await supabase
        .from('site_stats')
        .insert({ id: 1, views_count: 1 })
        .select('views_count')
        .single();

      if (!seedError && seeded) {
        return new Response(JSON.stringify({ viewsCount: seeded.views_count }), {
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        });
      }
    }

    console.error('[visits] Unable to read site statistics:', readError);
    return new Response(JSON.stringify({ error: 'Unable to read site statistics.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const nextCount = Number(stats.views_count) + 1;
  const { data: updated, error: updateError } = await supabase
    .from('site_stats')
    .update({ views_count: nextCount })
    .eq('id', 1)
    .select('views_count')
    .single();

  if (updateError || !updated) {
    return new Response(JSON.stringify({ error: 'Unable to update site statistics.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ viewsCount: updated.views_count }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};

export const prerender = false;
