import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsComponent } from './contacts.component';
import { ContactModule } from './contact/contact.module';
import { MatButtonModule } from '@angular/material/button';
import { ContactsRoutingModule } from './contacts.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    ContactsComponent,
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    ContactModule,
    SharedModule,
    MatButtonModule,
  ],
})
export class ContactsModule { }
