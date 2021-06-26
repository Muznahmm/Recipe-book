import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContactData, eventTypes } from 'src/app/helpers/types';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input('contactToDisplay') contact!: ContactData;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onCaptureEvent(e: eventTypes){
    switch(e) {
      case 'add':
        break;
      case 'visibility':
        this.onViewContact();
        break;
      case 'edit':
        this.onEditContact();
        break;
      case 'delete':
        break;
    }
  }

  onViewContact() {
    // console.log('Event view', e)
    this.router.navigate(['/contact', this.contact.id]);
  }

  onEditContact() {
    this.router.navigate(['/edit-contact',this.contact.id])
  }

}
