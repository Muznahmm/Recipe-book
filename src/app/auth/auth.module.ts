import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LayoutComponent } from './layout/layout.component';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';


@NgModule({
   declarations: [
    LayoutComponent,
   ],
   imports: [
      RouterModule,
      MatCardModule,
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
   ],
   exports: [
      LayoutComponent,
   ]
})

export class AuthModule {}
