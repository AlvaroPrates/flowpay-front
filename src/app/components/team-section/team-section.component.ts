import { Component, Input, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { Time, TimeLabels } from '../../core/models/time.enum';
import { Atendente } from '../../core/models/atendente.model';
import { AtendenteService } from '../../core/services/atendente.service';
import { DashboardService } from '../../core/services/dashboard.service';
import { WebsocketService } from '../../core/services/websocket.service';
import { WebSocketMessage, TipoMensagemWebSocket } from '../../core/models/websocket-message.model';
import { FilaIndicatorComponent } from '../fila-indicator/fila-indicator.component';
import { AtendenteCardComponent } from '../atendente-card/atendente-card.component';

interface TimeStatus {
  time: Time;
  tamanhoFila: number;
  atendimentosAtivos: number;
  atendentes: Atendente[];
}

@Component({
  selector: 'app-team-section',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FilaIndicatorComponent,
    AtendenteCardComponent
  ],
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.scss']
})
export class TeamSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() time!: Time;

  timeStatus: TimeStatus | null = null;
  loading = true;
  timeLabel = '';

  private destroy$ = new Subject<void>();

  constructor(
    private atendenteService: AtendenteService,
    private dashboardService: DashboardService,
    private websocketService: WebsocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.timeLabel = TimeLabels[this.time];
    this.subscribeToWebSocket();
  }

  ngAfterViewInit(): void {
    this.carregarDados();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  carregarDados(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.dashboardService.obterStatusTime(this.time)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (status) => {
          this.timeStatus = {
            time: this.time,
            tamanhoFila: status.tamanhoFila,
            atendimentosAtivos: status.atendimentosAtivos,
            atendentes: status.atendentes
          };
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Erro ao carregar status do time:', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  private subscribeToWebSocket(): void {
    this.websocketService.getMessages()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (message: WebSocketMessage) => {
          this.handleWebSocketMessage(message);
        },
        error: (error) => {
          console.error('Erro ao receber mensagem WebSocket no TeamSection:', error);
        }
      });
  }

  private handleWebSocketMessage(message: WebSocketMessage): void {
    switch (message.tipo) {
      case TipoMensagemWebSocket.NOVO_ATENDENTE:
        if (message.dados?.time === this.time) {
          console.log(`[${this.timeLabel}] Novo atendente detectado:`, message.dados);
          this.carregarDados();
        }
        break;

      case TipoMensagemWebSocket.NOVO_ATENDIMENTO:
        if (message.dados?.time === this.time) {
          console.log(`[${this.timeLabel}] Novo atendimento detectado:`, message.dados);
          this.carregarDados();
        }
        break;

      case TipoMensagemWebSocket.ATENDIMENTO_FINALIZADO:
        console.log(`[${this.timeLabel}] Atendimento finalizado, recarregando...`);
        this.carregarDados();
        break;

      case TipoMensagemWebSocket.FILA_ATUALIZADA:
        if (message.dados?.time === this.time) {
          console.log(`[${this.timeLabel}] Fila atualizada:`, message.dados);
          if (this.timeStatus) {
            this.timeStatus.tamanhoFila = message.dados.tamanhoFila;
            this.timeStatus.atendimentosAtivos = message.dados.atendimentosAtivos;
            this.cdr.detectChanges();
          }
        }
        break;

      default:
        break;
    }
  }

  atualizarDados(dados: any): void {
    if (dados.time === this.time) {
      this.carregarDados();
    }
  }
}
