import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtendenteService } from '../../core/services/atendente.service';
import { Time, TimeLabels } from '../../core/models/time.enum';

@Component({
  selector: 'app-cadastrar-atendente-dialog',
  templateUrl: './cadastrar-atendente-dialog.component.html',
  styleUrls: ['./cadastrar-atendente-dialog.component.scss']
})
export class CadastrarAtendenteDialogComponent {
  form: FormGroup;
  loading = false;
  times = Object.values(Time);
  timeLabels = TimeLabels;

  constructor(
    private fb: FormBuilder,
    private atendenteService: AtendenteService,
    private dialogRef: MatDialogRef<CadastrarAtendenteDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      time: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.atendenteService.cadastrar(this.form.value).subscribe({
      next: (atendente) => {
        this.snackBar.open(
          `Atendente ${atendente.nome} cadastrado com sucesso!`,
          'Fechar',
          { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Erro ao cadastrar atendente:', error);
        this.snackBar.open(
          'Erro ao cadastrar atendente. Tente novamente.',
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
