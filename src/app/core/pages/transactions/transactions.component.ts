import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/auth/auth.service';
import { TransactionData } from 'src/app/helpers/types';
import { TransactionsService } from './transactions.service';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  public transactions: TransactionData [] = [];
  public username = '';
  public email = ''


  public owesYou = 0;
  public youOwe = 0;

  private subscription!: Subscription;

  constructor(
    private transactionsService: TransactionsService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchAccountTransactionSummary();

    this.subscription = this.authService.user$
    .subscribe(user => {
      if (user) {
        this.username = user.username;
        this.email = user.email;
      }
    })
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
      });
  }

  public addNewTransaction(): void {
    const dialogRef = this.dialog.open(TransactionFormComponent,{
      width: '500px',
      data: {
        mode: 'create',
        afterCreate: this.refreshList,
      }
    });
  }

  public refreshList = () => {
    this.fetchTransaction();
    this.fetchAccountTransactionSummary();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private fetchAccountTransactionSummary(): void {
    this.transactionsService.fetchAccountSummary()
    .subscribe(res => {
      this.owesYou = res.owesYou;
      this.youOwe = res.youOwe;
    })
  }
}
