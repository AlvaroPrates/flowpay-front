import { Component, Input } from '@angular/core';
import { Atendente } from '../../core/models/atendente.model';

@Component({
  selector: 'app-atendente-card',
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
