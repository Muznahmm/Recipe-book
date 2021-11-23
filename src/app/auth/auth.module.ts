import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { LayoutComponent } from './layout/layout.component';
import { AutoLogoutModalComponent } from './auto-logout-modal/auto-logout-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
   declarations: [
    LayoutComponent,
    AutoLogoutModalComponent,
   ],
   imports: [
      RouterModule,
      MatCardModule,
      MatDialogModule,
      MatButtonModule,
      CommonModule,
   ],
   exports: [
      LayoutComponent,
   ]
})

export class AuthModule {}
