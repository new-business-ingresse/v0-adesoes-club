import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/client';
import { exportProducersToXLSX } from '@/lib/services/export.service';
import { ProducerAdhesion } from '@/lib/types';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('producer_adhesions')
      .select('*')
      .order('adhesion_timestamp', { ascending: false });

    if (error) throw error;

    const buffer = exportProducersToXLSX(data as ProducerAdhesion[]);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=produtoras_${new Date().toISOString().split('T')[0]}.xlsx`
      }
    });
  } catch (error) {
    console.error('Error exporting producers:', error);
    return NextResponse.json(
      { error: 'Erro ao exportar produtoras' },
      { status: 500 }
    );
  }
}
