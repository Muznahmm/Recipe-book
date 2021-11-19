import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CrudButtonsComponent } from './UI/crud-buttons/crud-buttons.component';
import { CrudButtonComponent } from './UI/crud-button/crud-button.component';
import { DeleteConfirmationDialogComponent } from './UI/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CharProfilePipe } from './pipes/char-profile.pipe';
import { SpinnerComponent } from './UI/spinner/spinner.component';

@NgModule({
  declarations: [
    CrudButtonComponent,
    CrudButtonsComponent,
    DeleteConfirmationDialogComponent,
    CharProfilePipe,
    SpinnerComponent,
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  exports: [
    CrudButtonComponent,
    CrudButtonsComponent,
    DeleteConfirmationDialogComponent,
    CharProfilePipe,
    SpinnerComponent,
  ],
})
export class SharedModule { }