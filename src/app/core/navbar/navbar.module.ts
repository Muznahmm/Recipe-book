import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar.component';
import { NavbarRoutingModule } from './navbar.routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
  ]
})
export class NavbarModule { }
