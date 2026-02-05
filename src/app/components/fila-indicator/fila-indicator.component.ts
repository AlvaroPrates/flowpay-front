import { Component, Input } from '@angular/core';
import { Time } from '../../core/models/time.enum';

@Component({
  selector: 'app-fila-indicator',
  templateUrl: './fila-indicator.component.html',
  styleUrls: ['./fila-indicator.component.scss']
})
export class FilaIndicatorComponent {
  @Input() time!: Time;
  @Input() tamanhoFila: number = 0;
  @Input() atendimentosAtivos: number = 0;

  Math = Math;

  getSeverityClass(): string {
    if (this.tamanhoFila === 0) {
      return 'success';
    } else if (this.tamanhoFila < 5) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  getFilaIcon(): string {
    if (this.tamanhoFila === 0) {
      return 'check_circle';
    } else if (this.tamanhoFila < 5) {
      return 'schedule';
    } else {
      return 'warning';
    }
  }

  getFilaMessage(): string {
    if (this.tamanhoFila === 0) {
      return 'Fila vazia';
    } else if (this.tamanhoFila === 1) {
      return '1 pessoa aguardando';
    } else {
      return `${this.tamanhoFila} pessoas aguardando`;
    }
  }
}
