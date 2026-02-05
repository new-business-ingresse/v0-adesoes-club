import { supabase, lpSupabase } from '@/lib/db/client';
import { fetchSurveyResponses } from './posthog.service';

export async function syncPostHogSurvey() {
  try {
    const responses = await fetchSurveyResponses();
    let eventsCount = 0;
    let producersCount = 0;

    for (const response of responses) {
      if (response.scope === "APENAS ESTE evento") {
        await supabase
          .from('event_adhesions')
          .upsert({
            posthog_person_id: response.person_id,
            event_backstage_url: response.page_url,
            discount_percentage: response.discount,
            adhesion_timestamp: response.timestamp,
            status: 'pending'
          }, {
            onConflict: 'posthog_person_id'
          });
        eventsCount++;
      } else if (response.scope === "TODOS os meus eventos") {
        await supabase
          .from('producer_adhesions')
          .upsert({
            posthog_person_id: response.person_id,
            producer_name: `Producer from ${response.page_url}`,
            discount_percentage: response.discount,
            adhesion_timestamp: response.timestamp,
            source: 'survey_backstage',
            status: 'pending'
          }, {
            onConflict: 'posthog_person_id,source'
          });
        producersCount++;
      }
    }

    await supabase
      .from('sync_metadata')
      .upsert({
        source: 'posthog_survey',
        last_sync_at: new Date().toISOString(),
        last_sync_status: 'success',
        records_synced: eventsCount + producersCount,
        error_message: null
      }, {
        onConflict: 'source'
      });

    return { eventsCount, producersCount, total: eventsCount + producersCount };
  } catch (error) {
    await supabase
      .from('sync_metadata')
      .upsert({
        source: 'posthog_survey',
        last_sync_at: new Date().toISOString(),
        last_sync_status: 'error',
        records_synced: 0,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }, {
        onConflict: 'source'
      });

    throw error;
  }
}

export async function syncProducerSubmissions() {
  try {
    const { data: lastSync } = await supabase
      .from('sync_metadata')
      .select('last_sync_at')
      .eq('source', 'supabase_lp')
      .single();

    const { data: submissions, error } = await lpSupabase
      .from('producer_submissions')
      .select('*')
      .gt('submitted_at', lastSync?.last_sync_at || '2020-01-01')
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    if (!submissions || submissions.length === 0) {
      return { count: 0 };
    }

    for (const submission of submissions) {
      await supabase
        .from('producer_adhesions')
        .upsert({
          cnpj: submission.cnpj,
          producer_name: submission.producer_name,
          contact_name: submission.contact_name,
          whatsapp: submission.whatsapp,
          email: submission.email,
          discount_percentage: submission.discount_percentage,
          adhesion_timestamp: submission.submitted_at,
          source: 'lp_producers',
          status: 'pending'
        });
    }

    await supabase
      .from('sync_metadata')
      .upsert({
        source: 'supabase_lp',
        last_sync_at: new Date().toISOString(),
        last_sync_status: 'success',
        records_synced: submissions.length,
        error_message: null
      }, {
        onConflict: 'source'
      });

    return { count: submissions.length };
  } catch (error) {
    await supabase
      .from('sync_metadata')
      .upsert({
        source: 'supabase_lp',
        last_sync_at: new Date().toISOString(),
        last_sync_status: 'error',
        records_synced: 0,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      }, {
        onConflict: 'source'
      });

    throw error;
  }
}
