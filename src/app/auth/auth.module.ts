import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from '../core/navbar/navbar.component';


@NgModule({
   declarations: [
    LoginComponent,
    SignupComponent,
    LayoutComponent,
   ],
   imports: [
      RouterModule,
      MatCardModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
   ]
})

export class AuthModule {}
