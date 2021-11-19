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
  public contact!: ContactData;
  public transactions: TransactionData[] = [];
  public isLoadingContact = false;
  public isLoadingTxn = false;
  
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
      disableClose: true,
      width: '500px',
      data: {
        mode: 'create',
        contactId: this.contactId,
        afterCreate: () => {
          this.fetchTransactions();
        }
      }
    })
  }

  private fetchContact() {
    this.isLoadingContact = true;

    this.contactsService.fetchContactById(this.contactId)
    .subscribe(contact => {
      this.isLoadingContact = false;

      this.contact = contact;
    })
  }

  private fetchTransactions() {
    this.isLoadingTxn = true;

    this.transactionsService
      .fetchTransactionsOfContact(this.contactId)
      .subscribe(res => {
        this.isLoadingTxn = false;
        this.transactions = res.transactions;
        this.refreshList;
      });
  }

  public refreshList = () => {
    this.fetchContact();
    this.fetchTransactions();
  }
}
