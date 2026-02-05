import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Atendente } from '../models/atendente.model';
import { Time } from '../models/time.enum';

export interface CadastrarAtendenteRequest {
  nome: string;
  time: Time;
}

@Injectable({
  providedIn: 'root'
})
export class AtendenteService {
  private apiUrl = `${environment.apiUrl}/atendentes`;

  constructor(private http: HttpClient) {}

  cadastrar(request: CadastrarAtendenteRequest): Observable<Atendente> {
    return this.http.post<Atendente>(this.apiUrl, request);
  }

  listarTodos(): Observable<Atendente[]> {
    return this.http.get<Atendente[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Atendente> {
    return this.http.get<Atendente>(`${this.apiUrl}/${id}`);
  }

  listarPorTime(time: Time): Observable<Atendente[]> {
    return this.http.get<Atendente[]>(`${this.apiUrl}/time/${time}`);
  }

  listarDisponiveis(time: Time): Observable<Atendente[]> {
    return this.http.get<Atendente[]>(`${this.apiUrl}/time/${time}/disponiveis`);
  }
}
