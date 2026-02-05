export enum StatusAtendimento {
  AGUARDANDO_ATENDIMENTO = 'AGUARDANDO_ATENDIMENTO',
  EM_ATENDIMENTO = 'EM_ATENDIMENTO',
  FINALIZADO = 'FINALIZADO'
}

export const StatusAtendimentoLabels: Record<StatusAtendimento, string> = {
  [StatusAtendimento.AGUARDANDO_ATENDIMENTO]: 'Aguardando',
  [StatusAtendimento.EM_ATENDIMENTO]: 'Em Atendimento',
  [StatusAtendimento.FINALIZADO]: 'Finalizado'
};
