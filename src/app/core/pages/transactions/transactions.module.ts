import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsComponent } from './transactions.component';
import { TransactionModule } from './transaction/transaction.module';
import { MatIconModule } from '@angular/material/icon';
import { NavbarModule } from '../../navbar/navbar.module';



@NgModule({
  declarations: [
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    TransactionModule,
    MatIconModule,
    NavbarModule,
  ]
})
export class TransactionsModule { }
