import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TransactionData } from 'src/app/helpers/types';
import { TransactionsService } from './transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: TransactionData [] = [];

  constructor(
    private transactionsService: TransactionsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // this.authService.login()
    this.fetchTransaction();
  }

  fetchTransaction() {
    this.transactionsService
    .fetchTransactionsOfAccount()
    .subscribe( res => {
      this.transactions = res.transactions;
    })
  }

  fetchTransactions() {
    this.transactionsService
      .fetchTransactionsOfAccount()
      .subscribe(res => {
        this.transactions = res.transactions;
        console.log(res)
      });
  }
}
