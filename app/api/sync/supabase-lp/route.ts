import { NextResponse } from 'next/server';
import { syncProducerSubmissions } from '@/lib/services/sync.service';

export async function POST() {
  try {
    const result = await syncProducerSubmissions();

    return NextResponse.json({
      message: 'Sincronização concluída com sucesso',
      data: result
    });
  } catch (error) {
    console.error('Error syncing Supabase LP:', error);
    return NextResponse.json(
      { error: 'Erro ao sincronizar dados do Supabase LP' },
      { status: 500 }
    );
  }
}
