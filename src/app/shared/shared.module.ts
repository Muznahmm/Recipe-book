import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { CrudButtonsComponent } from './UI/crud-buttons/crud-buttons.component';
import { CrudButtonComponent } from './UI/crud-button/crud-button.component';
import { DeleteConfirmationDialogComponent } from './UI/delete-confirmation-dialog/delete-confirmation-dialog.component';

@NgModule({
  declarations: [
    CrudButtonComponent,
    CrudButtonsComponent,
    DeleteConfirmationDialogComponent,
    
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
  ],
  exports: [
    CrudButtonComponent,
    CrudButtonsComponent,
    DeleteConfirmationDialogComponent,
  ],
})
export class SharedModule { }