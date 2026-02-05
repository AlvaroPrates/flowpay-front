import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtendimentoService } from '../../core/services/atendimento.service';
import { Time, TimeLabels } from '../../core/models/time.enum';

@Component({
  selector: 'app-criar-atendimento-dialog',
  templateUrl: './criar-atendimento-dialog.component.html',
  styleUrls: ['./criar-atendimento-dialog.component.scss']
})
export class CriarAtendimentoDialogComponent {
  form: FormGroup;
  loading = false;
  times = Object.values(Time);
  timeLabels = TimeLabels;

  constructor(
    private fb: FormBuilder,
    private atendimentoService: AtendimentoService,
    private dialogRef: MatDialogRef<CriarAtendimentoDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nomeCliente: ['', [Validators.required, Validators.minLength(3)]],
      assunto: ['', [Validators.required, Validators.minLength(5)]],
      time: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.atendimentoService.criar(this.form.value).subscribe({
      next: (atendimento) => {
        this.snackBar.open(
          `Atendimento #${atendimento.id} criado com sucesso!`,
          'Fechar',
          { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Erro ao criar atendimento:', error);
        this.snackBar.open(
          'Erro ao criar atendimento. Tente novamente.',
          'Fechar',
          { duration: 5000 }
        );
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
