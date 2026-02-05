import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AtendimentoService } from '../../core/services/atendimento.service';
import { Time, TimeLabels } from '../../core/models/time.enum';

@Component({
  selector: 'app-criar-atendimento-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
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
