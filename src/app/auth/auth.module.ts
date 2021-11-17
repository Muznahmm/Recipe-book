import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { LayoutComponent } from './layout/layout.component';
import { NavbarModule } from '../core/navbar/navbar.module';

@NgModule({
   declarations: [
    LayoutComponent,
   ],
   imports: [
      RouterModule,
      MatCardModule,
      CommonModule,
   ],
   exports: [
      LayoutComponent,
   ]
})

export class AuthModule {}
