import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../../core/services/dashboard.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { DashboardMetricas } from '../../core/models/metricas.model';
import { Time } from '../../core/models/time.enum';
import { WebSocketMessage, TipoMensagemWebSocket } from '../../core/models/websocket-message.model';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  metricas: DashboardMetricas | null = null;
  times = Object.values(Time);
  loading = true;
  wsConnected = false;

  private destroy$ = new Subject<void>();

  constructor(
    private dashboardService: DashboardService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.carregarMetricas();
    this.conectarWebSocket();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.websocketService.disconnect();
  }

  carregarMetricas(): void {
    this.loading = true;

    this.dashboardService.obterMetricas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (metricas) => {
          this.metricas = metricas;
          this.loading = false;
          console.log('✅ Métricas carregadas:', metricas);
        },
        error: (error) => {
          console.error('❌ Erro ao carregar métricas:', error);
          this.loading = false;
        }
      });
  }

  conectarWebSocket(): void {
    this.websocketService.connect();

    this.websocketService.getMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (message: WebSocketMessage) => {
          console.log('📨 Mensagem WebSocket recebida:', message);
          this.handleWebSocketMessage(message);
        },
        error: (error) => {
          console.error('❌ Erro no WebSocket:', error);
          this.wsConnected = false;
        }
      });

    // Marca como conectado após delay
    setTimeout(() => {
      this.wsConnected = true;
      console.log('✅ WebSocket conectado');
    }, 1000);
  }

  handleWebSocketMessage(message: WebSocketMessage): void {
    switch (message.tipo) {
      case TipoMensagemWebSocket.NOVO_ATENDIMENTO:
        console.log('🆕 Novo atendimento criado');
        this.carregarMetricas();
        break;

      case TipoMensagemWebSocket.ATENDIMENTO_FINALIZADO:
        console.log('✅ Atendimento finalizado');
        this.carregarMetricas();
        break;

      case TipoMensagemWebSocket.FILA_ATUALIZADA:
        console.log('📊 Fila atualizada:', message.dados);
        this.carregarMetricas();
        break;

      case TipoMensagemWebSocket.METRICAS_ATUALIZADAS:
        console.log('📈 Métricas atualizadas');
        this.metricas = message.dados;
        break;

      default:
        console.log('❓ Tipo de mensagem desconhecido:', message.tipo);
    }
  }

  onDialogClosed(result: boolean): void {
    if (result) {
      // Dialog foi fechado com sucesso (criou atendimento/atendente)
      setTimeout(() => {
        this.carregarMetricas();
      }, 500);
    }
  }

  getTimeLabel(time: Time): string {
    const labels: Record<Time, string> = {
      [Time.CARTOES]: 'Cartões',
      [Time.EMPRESTIMOS]: 'Empréstimos',
      [Time.OUTROS]: 'Outros Assuntos'
    };
    return labels[time];
  }
}
