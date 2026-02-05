import { Time } from './time.enum';

export interface Atendente {
  id: number;
  nome: string;
  time: Time;
  atendimentosAtivos: number;
  capacidadeMaxima: number;
  disponivel: boolean;
}
