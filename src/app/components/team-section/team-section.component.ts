import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Time, TimeLabels } from '../../core/models/time.enum';
import { Atendente } from '../../core/models/atendente.model';
import { AtendenteService } from '../../core/services/atendente.service';
import { DashboardService } from '../../core/services/dashboard.service';
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
export class TeamSectionComponent implements OnInit {
  @Input() time!: Time;

  timeStatus: TimeStatus | null = null;
  loading = true;
  timeLabel = '';

  constructor(
    private atendenteService: AtendenteService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.timeLabel = TimeLabels[this.time];
    this.carregarDados();
  }

  carregarDados(): void {
    this.loading = true;

    this.dashboardService.obterStatusTime(this.time).subscribe({
      next: (status) => {
        this.timeStatus = {
          time: this.time,
          tamanhoFila: status.tamanhoFila,
          atendimentosAtivos: status.atendimentosAtivos,
          atendentes: status.atendentes
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar status do time:', error);
        this.loading = false;
      }
    });
  }

  atualizarDados(dados: any): void {
    if (dados.time === this.time) {
      this.carregarDados();
    }
  }
}
