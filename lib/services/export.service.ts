import * as XLSX from 'xlsx';
import { EventAdhesion, ProducerAdhesion } from '@/lib/types';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR');
}

export function exportEventsToXLSX(events: EventAdhesion[]): Buffer {
  const data = events.map(event => ({
    'URL do Evento': event.event_backstage_url,
    'Desconto (%)': event.discount_percentage,
    'Data/Hora de Adesão': formatDate(event.adhesion_timestamp),
    'Status': event.status === 'pending' ? 'Pendente' : 'Integrado',
    'Marcado Por': event.marked_by || '-',
    'Marcado Em': event.marked_at ? formatDate(event.marked_at) : '-'
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Eventos');

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
}

export function exportProducersToXLSX(producers: ProducerAdhesion[]): Buffer {
  const data = producers.map(producer => ({
    'CNPJ': producer.cnpj || '-',
    'Nome da Produtora': producer.producer_name,
    'Nome do Contato': producer.contact_name || '-',
    'WhatsApp': producer.whatsapp || '-',
    'E-mail': producer.email || '-',
    'Desconto (%)': producer.discount_percentage,
    'Data/Hora de Adesão': formatDate(producer.adhesion_timestamp),
    'Origem': producer.source === 'lp_producers' ? 'LP Produtores' : 'Survey Backstage',
    'Status': producer.status === 'pending' ? 'Pendente' : 'Integrado',
    'Marcado Por': producer.marked_by || '-',
    'Marcado Em': producer.marked_at ? formatDate(producer.marked_at) : '-'
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Produtoras');

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
}
