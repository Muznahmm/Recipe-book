import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ContactViewRoutingModule } from './contact-view.routing.module';
import { ContactViewComponent } from './contact-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransactionModule } from '../../transactions/transaction/transaction.module';
import { TransactionFormModule } from '../../transactions/transaction-form/transaction-form.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ContactViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    ContactViewRoutingModule,
    TransactionModule,
    TransactionFormModule,
  ]
})
export class ContactViewModule { }
