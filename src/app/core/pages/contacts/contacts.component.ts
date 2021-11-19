import { Component, OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';
import { ContactData } from '../../../helpers/types/contacts.types';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public contacts: ContactData[] = [];
  public isLoading = false;

  constructor(
    private contactsService: ContactsService,
  ) { }

  ngOnInit() {
    this.fetchContacts();
  }

  fetchContacts() {
    this.isLoading = true;
    this.contactsService
    .fetchContacts()
    .subscribe(res => {
      this.isLoading = false;
      this.contacts = res.contacts;
    });
  }

}
