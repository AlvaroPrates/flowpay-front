import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardMetricas } from '../../core/models/metricas.model';

@Component({
  selector: 'app-metrics-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './metrics-panel.component.html',
  styleUrls: ['./metrics-panel.component.scss']
})
export class MetricsPanelComponent {
  @Input() metricas: DashboardMetricas | null = null;
}
