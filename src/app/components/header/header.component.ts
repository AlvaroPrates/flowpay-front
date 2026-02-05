import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CriarAtendimentoDialogComponent } from '../../dialogs/criar-atendimento-dialog/criar-atendimento-dialog.component';
import { CadastrarAtendenteDialogComponent } from '../../dialogs/cadastrar-atendente-dialog/cadastrar-atendente-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  abrirDialogNovoAtendimento(): void {
    this.dialog.open(CriarAtendimentoDialogComponent, {
      width: '500px'
    });
  }

  abrirDialogNovoAtendente(): void {
    this.dialog.open(CadastrarAtendenteDialogComponent, {
      width: '400px'
    });
  }
}
