import { Component, Input, OnInit } from '@angular/core';
import { Time, TimeLabels } from '../../core/models/time.enum';
import { Atendente } from '../../core/models/atendente.model';
import { AtendenteService } from '../../core/services/atendente.service';
import { DashboardService } from '../../core/services/dashboard.service';

interface TimeStatus {
  time: Time;
  tamanhoFila: number;
  atendimentosAtivos: number;
  atendentes: Atendente[];
}

@Component({
  selector: 'app-team-section',
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
