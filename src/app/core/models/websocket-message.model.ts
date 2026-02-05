export enum TipoMensagemWebSocket {
  NOVO_ATENDIMENTO = 'NOVO_ATENDIMENTO',
  ATENDIMENTO_FINALIZADO = 'ATENDIMENTO_FINALIZADO',
  FILA_ATUALIZADA = 'FILA_ATUALIZADA',
  METRICAS_ATUALIZADAS = 'METRICAS_ATUALIZADAS'
}

export interface WebSocketMessage {
  tipo: TipoMensagemWebSocket;
  timestamp: string;
  dados: any;
  mensagem?: string;
}
