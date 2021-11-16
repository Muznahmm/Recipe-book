import { Component, OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';
import { ContactData } from '../../../helpers/types/contacts.types';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: ContactData[] = [];
  
  constructor(
    private contactsService: ContactsService,
  ) { }

  ngOnInit() {
    this.fetchContacts();
  }

  fetchContacts() {
    this.contactsService
    .fetchContacts()
    .subscribe(res => {
      console.log(res.contacts)
      this.contacts = res.contacts;
    });
  }

}
