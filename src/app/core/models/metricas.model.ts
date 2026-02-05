import { Time } from './time.enum';

export interface DashboardMetricas {
  totalAtendimentosAtivos: number;
  totalNaFila: number;
  totalAtendentes: number;
  atendentesDisponiveis: number;
  filasPorTime: Record<Time, number>;
  atendimentosAtivosPorTime: Record<Time, number>;
}
