import { Component, OnInit } from '@angular/core';

import { ContactsService } from './contacts.service';
import { ContactData } from '../../../helpers/types/contacts.types';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts: ContactData[] = [];
  
  constructor(
    private contactsService: ContactsService,
    private dialog: MatDialog,
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

  public onCreateContact(): void {
    const dialogRef = this.dialog.open(ContactFormComponent,{
      width: '500px',
      data: {
        mode: 'create',
      }
    });
  }

}
