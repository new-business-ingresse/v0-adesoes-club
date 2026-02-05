import { NextResponse } from 'next/server';
import { syncPostHogSurvey } from '@/lib/services/sync.service';

export async function POST() {
  try {
    const result = await syncPostHogSurvey();

    return NextResponse.json({
      message: 'Sincronização concluída com sucesso',
      data: result
    });
  } catch (error) {
    console.error('Error syncing PostHog:', error);
    return NextResponse.json(
      { error: 'Erro ao sincronizar dados do PostHog' },
      { status: 500 }
    );
  }
}
