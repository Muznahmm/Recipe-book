import { Component, Input, OnInit } from '@angular/core';
import { TransactionData, TransactionTypeCode } from 'src/app/helpers/types';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @Input('transaction') txn!: TransactionData;
  @Input('isLast') isLast!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  get containerStyleClass() {
    return (
      (this.txn.type === TransactionTypeCode.OWES_YOU) ? 'Owes_you': 'Is_owed'
    );
  }

  get transactionType() {
    return (
      (this.txn.type === TransactionTypeCode.OWES_YOU) ? 'Owes_you': 'Is_owed'
    );
  }

  get transactionNote() {
    return this.txn.note ? this.txn.note : 'No notes provided!' ;
  }

  get description() {
    return this.txn.description ? this.txn.description : 'No description provided!';
  }
}
