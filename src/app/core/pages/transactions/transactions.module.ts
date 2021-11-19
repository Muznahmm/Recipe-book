import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsComponent } from './transactions.component';
import { TransactionModule } from './transaction/transaction.module';
import { MatIconModule } from '@angular/material/icon';
import { TransactionsRoutingModule } from './transactions.routing.module';
import { TransactionFormModule } from './transaction-form/transaction-form.module';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    TransactionModule,
    TransactionFormModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class TransactionsModule { }
