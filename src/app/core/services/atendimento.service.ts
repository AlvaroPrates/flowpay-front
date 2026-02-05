import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Atendimento, CriarAtendimentoRequest } from '../models/atendimento.model';
import { Time } from '../models/time.enum';
import { StatusAtendimento } from '../models/status-atendimento.enum';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  private apiUrl = `${environment.apiUrl}/atendimentos`;

  constructor(private http: HttpClient) {}

  criar(request: CriarAtendimentoRequest): Observable<Atendimento> {
    return this.http.post<Atendimento>(this.apiUrl, request);
  }

  listarTodos(): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Atendimento> {
    return this.http.get<Atendimento>(`${this.apiUrl}/${id}`);
  }

  listarPorTime(time: Time): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.apiUrl}/time/${time}`);
  }

  listarPorStatus(status: StatusAtendimento): Observable<Atendimento[]> {
    return this.http.get<Atendimento[]>(`${this.apiUrl}/status/${status}`);
  }

  finalizar(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/finalizar`, {});
  }
}
