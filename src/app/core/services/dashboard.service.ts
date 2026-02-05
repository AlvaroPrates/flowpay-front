import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardMetricas } from '../models/metricas.model';
import { Time } from '../models/time.enum';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  obterMetricas(): Observable<DashboardMetricas> {
    return this.http.get<DashboardMetricas>(`${this.apiUrl}/metricas`);
  }

  obterStatusTime(time: Time): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/time/${time}`);
  }
}
