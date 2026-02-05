import { PostHogSurveyResponse } from '@/lib/types';

const POSTHOG_API_URL = process.env.POSTHOG_API_URL!;
const POSTHOG_API_KEY = process.env.POSTHOG_PERSONAL_API_KEY!;
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID!;

export async function fetchSurveyResponses(): Promise<PostHogSurveyResponse[]> {
  const hogqlQuery = `
    SELECT
      person.id AS person_id,
      properties.$survey_response_8d5cd2be-04b6-4141-8ced-003919ae1550 AS discount,
      properties.$survey_response_3bdfbd48-7d4c-46e6-a63d-dc5b8cab30ae AS scope,
      properties.$current_url AS page_url,
      timestamp
    FROM events
    WHERE event = 'survey sent'
    AND properties.$survey_id = '019b99b2-206f-0000-5021-c316faa06be3'
    ORDER BY timestamp DESC
  `;

  const response = await fetch(
    `${POSTHOG_API_URL}/api/projects/${PROJECT_ID}/query/`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${POSTHOG_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: {
          kind: 'HogQLQuery',
          query: hogqlQuery
        }
      }),
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    throw new Error(`PostHog API error: ${response.statusText}`);
  }

  const data = await response.json();

  return data.results.map((row: any[]) => ({
    person_id: row[0],
    discount: row[1],
    scope: row[2],
    page_url: row[3],
    timestamp: row[4]
  }));
}
