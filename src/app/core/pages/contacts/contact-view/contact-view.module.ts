import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactViewRoutingModule } from './contact-view.routing.module';

import { ContactViewComponent } from './contact-view.component';
import { ContactsModule } from '../contacts.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { TransactionModule } from '../../transactions/transaction/transaction.module';
import { TransactionFormModule } from '../../transactions/transaction-form/transaction-form.module';



@NgModule({
  declarations: [
    ContactViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    ContactViewRoutingModule,
    TransactionModule,
    TransactionFormModule,
  ]
})
export class ContactViewModule { }
