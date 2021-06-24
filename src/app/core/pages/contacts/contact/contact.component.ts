import { Component, Input, OnInit } from '@angular/core';
import { ContactData } from 'src/app/helpers/types';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input('contactToDisplay') contact!: ContactData;

  constructor() { }

  ngOnInit(): void {
  }

}
