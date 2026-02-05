import { Time } from './time.enum';
import { StatusAtendimento } from './status-atendimento.enum';

export interface Atendimento {
  id: number;
  nomeCliente: string;
  assunto: string;
  time: Time;
  status: StatusAtendimento;
  atendenteId?: number;
  nomeAtendente?: string;
  dataHoraCriacao: string;
  dataHoraAtendimento?: string;
  dataHoraFinalizacao?: string;
}

export interface CriarAtendimentoRequest {
  nomeCliente: string;
  assunto: string;
  time: Time;
}
