import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LayoutComponent } from './layout/layout.component';


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
      FormsModule,
      CommonModule,
   ]
})

export class AuthModule {

}