// Database types
export interface EventAdhesion {
  id: string;
  posthog_person_id: string;
  event_backstage_url: string;
  discount_percentage: string;
  adhesion_timestamp: string;
  status: 'pending' | 'integrated';
  marked_by: string | null;
  marked_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProducerAdhesion {
  id: string;
  posthog_person_id: string | null;
  cnpj: string | null;
  producer_name: string;
  contact_name: string | null;
  whatsapp: string | null;
  email: string | null;
  discount_percentage: string;
  adhesion_timestamp: string;
  source: 'lp_producers' | 'survey_backstage';
  status: 'pending' | 'integrated';
  marked_by: string | null;
  marked_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostHogSurveyResponse {
  person_id: string;
  discount: string;
  scope: string;
  page_url: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
