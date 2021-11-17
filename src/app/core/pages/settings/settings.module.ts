import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SettingsRoutingModule } from './settings.routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ]
})
export class SettingsModule { }
