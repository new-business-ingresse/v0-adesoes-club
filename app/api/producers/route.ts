import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const source = searchParams.get('source');

    let query = supabase
      .from('producer_adhesions')
      .select('*')
      .order('adhesion_timestamp', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (source) {
      query = query.eq('source', source);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching producers:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produtoras' },
      { status: 500 }
    );
  }
}
