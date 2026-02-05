import { Component, Input } from '@angular/core';
import { DashboardMetricas } from '../../core/models/metricas.model';

@Component({
  selector: 'app-metrics-panel',
  templateUrl: './metrics-panel.component.html',
  styleUrls: ['./metrics-panel.component.scss']
})
export class MetricsPanelComponent {
  @Input() metricas: DashboardMetricas | null = null;
}
