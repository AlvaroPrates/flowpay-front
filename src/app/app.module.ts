import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './components/header/header.component';
import { MetricsPanelComponent } from './components/metrics-panel/metrics-panel.component';
import { TeamSectionComponent } from './components/team-section/team-section.component';
import { AtendenteCardComponent } from './components/atendente-card/atendente-card.component';
import { FilaIndicatorComponent } from './components/fila-indicator/fila-indicator.component';

// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// Dialogs
import { CriarAtendimentoDialogComponent } from './dialogs/criar-atendimento-dialog/criar-atendimento-dialog.component';
import { CadastrarAtendenteDialogComponent } from './dialogs/cadastrar-atendente-dialog/cadastrar-atendente-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MetricsPanelComponent,
    TeamSectionComponent,
    AtendenteCardComponent,
    FilaIndicatorComponent,
    DashboardComponent,
    CriarAtendimentoDialogComponent,
    CadastrarAtendenteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    // Material
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatChipsModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
