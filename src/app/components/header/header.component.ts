import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CriarAtendimentoDialogComponent } from '../../dialogs/criar-atendimento-dialog/criar-atendimento-dialog.component';
import { CadastrarAtendenteDialogComponent } from '../../dialogs/cadastrar-atendente-dialog/cadastrar-atendente-dialog.component';

@Component({
  selector: 'app-header',
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
