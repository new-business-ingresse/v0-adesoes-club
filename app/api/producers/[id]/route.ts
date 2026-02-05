import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db/client';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'integrated'].includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('producer_adhesions')
      .update({
        status,
        marked_by: 'admin',
        marked_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error updating producer:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar produtora' },
      { status: 500 }
    );
  }
}
