import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/client';
import { exportEventsToXLSX } from '@/lib/services/export.service';
import { EventAdhesion } from '@/lib/types';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('event_adhesions')
      .select('*')
      .order('adhesion_timestamp', { ascending: false });

    if (error) throw error;

    const buffer = exportEventsToXLSX(data as EventAdhesion[]);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename=eventos_${new Date().toISOString().split('T')[0]}.xlsx`
      }
    });
  } catch (error) {
    console.error('Error exporting events:', error);
    return NextResponse.json(
      { error: 'Erro ao exportar eventos' },
      { status: 500 }
    );
  }
}
