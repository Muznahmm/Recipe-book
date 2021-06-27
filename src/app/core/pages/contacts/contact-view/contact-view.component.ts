import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactData, TransactionData } from 'src/app/helpers/types';
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
    private transactionsService: TransactionsService
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

  private fetchContact() {
    this.contactsService.fetchContactById(this.contactId)
    .subscribe(contact => {
      this.contact = contact;
    })
  }

  fetchTransactions() {
    this.transactionsService
      .fetchTransactionsOfContact(this.contactId)
      .subscribe(res => {
        this.transactions = res.transactions;
        console.log(res)
      });
  }
}
