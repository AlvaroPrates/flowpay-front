import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Atendente } from '../../core/models/atendente.model';

@Component({
  selector: 'app-atendente-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  templateUrl: './atendente-card.component.html',
  styleUrls: ['./atendente-card.component.scss']
})
export class AtendenteCardComponent {
  @Input() atendente!: Atendente;

  getStatusClass(): string {
    if (this.atendente.atendimentosAtivos === 0) {
      return 'disponivel';
    } else if (this.atendente.atendimentosAtivos < 3) {
      return 'ocupado';
    } else {
      return 'lotado';
    }
  }

  getStatusLabel(): string {
    if (this.atendente.atendimentosAtivos === 0) {
      return 'Disponível';
    } else if (this.atendente.atendimentosAtivos < 3) {
      return 'Ocupado';
    } else {
      return 'Lotado';
    }
  }

  getSlots(): boolean[] {
    return Array(3).fill(false).map((_, i) => i < this.atendente.atendimentosAtivos);
  }
}
