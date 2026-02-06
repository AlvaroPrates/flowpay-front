import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { environment } from '../../../environments/environment';
import { WebSocketMessage } from '../models/websocket-message.model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client | null = null;
  private messageSubject = new Subject<WebSocketMessage>();
  private connected = false;

  connect(): void {
    if (this.connected) {
      console.log('WebSocket já conectado');
      return;
    }

    this.client = new Client({
      webSocketFactory: () => new SockJS(environment.wsUrl),
      debug: (str) => console.log('STOMP:', str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = () => {
      console.log('✅ WebSocket conectado!');
      this.connected = true;
      this.subscribeToTopics();
    };

    this.client.onStompError = (frame) => {
      console.error('❌ Erro STOMP:', frame);
    };

    this.client.activate();
  }

  private subscribeToTopics(): void {
    if (!this.client) return;

    // Atendimentos
    this.client.subscribe('/topic/atendimentos', (message: IMessage) => {
      this.handleMessage(message);
    });

    // Filas
    this.client.subscribe('/topic/filas', (message: IMessage) => {
      this.handleMessage(message);
    });

    // Métricas
    this.client.subscribe('/topic/metricas', (message: IMessage) => {
      this.handleMessage(message);
    });

    // Atendentes
    this.client.subscribe('/topic/atendentes', (message: IMessage) => {
      this.handleMessage(message);
    });

    console.log('📡 Inscrito nos tópicos WebSocket');
  }

  private handleMessage(message: IMessage): void {
    try {
      const data: WebSocketMessage = JSON.parse(message.body);
      this.messageSubject.next(data);
    } catch (error) {
      console.error('Erro ao parsear mensagem WebSocket:', error);
    }
  }

  getMessages(): Observable<WebSocketMessage> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.connected = false;
      console.log('🔌 WebSocket desconectado');
    }
  }
}
