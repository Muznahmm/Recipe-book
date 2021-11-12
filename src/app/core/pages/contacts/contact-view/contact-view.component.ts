import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ContactData, TransactionData } from 'src/app/helpers/types';
import { TransactionFormComponent } from '../../transactions/transaction-form/transaction-form.component';
import { TransactionsService } from '../../transactions/transactions.service';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {
  contact!: ContactData;
  transactions: TransactionData[] = [];
  
  private contactId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private transactionsService: TransactionsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe(param => {
      this.contactId = +param['id'];
      this.fetchContact();
      this.fetchTransactions()
    });
  }

  get fullName() {
    return `${this.contact.firstName + ' ' + this.contact.lastName }`;
  }

  public onAddTransaction(): void {
    this.dialog.open(TransactionFormComponent, {
      width: '500px',
      data: {
        mode: 'create',
        afterCreate: () => {
          this.fetchTransactions();
        }
      }
    })
  }

  private fetchContact() {
    this.contactsService.fetchContactById(this.contactId)
    .subscribe(contact => {
      this.contact = contact;
    })
  }

  private fetchTransactions() {
    this.transactionsService
      .fetchTransactionsOfContact(this.contactId)
      .subscribe(res => {
        this.transactions = res.transactions;
        console.log(res)
      });
  }
}
