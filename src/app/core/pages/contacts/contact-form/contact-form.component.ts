import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ContactFormService } from './contact-form.service';
import { ContactsService } from '../contacts.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionFormComponent } from '../../transactions/transaction-form/transaction-form.component';

interface ModelData {
  mode: 'create' | 'edit' | 'view';
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent implements OnInit {
  @ViewChild('contactFrom') form!: NgForm;

  private contactId?: number;

  title = 'New Contact';
  buttonName = 'Create';

  constructor(
    private contactFormService: ContactFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    @Inject(MAT_DIALOG_DATA) public data: ModelData,
    private dialogRef: MatDialogRef<TransactionFormComponent>,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(param => {
        if (param['id']) {
          this.contactId = +param['id'];
          this.title = 'Edit Contact';
          this.buttonName = 'Update'
    
          this.contactsService
            .fetchContactById(this.contactId)
            .subscribe(res => {
              this.form.setValue({
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
              });
            });
        }
      });
  }

  onContactForm() {
    if(!this.contactId){
      this.contactFormService
          .createContact(this.form.value)
          .subscribe( _ => {
            this.router.navigateByUrl('/contacts');
      });
    } else {
      const updateContact = {
        ...this.form.value,
        id: this.contactId
      }
      this.contactFormService
      .updateContact(updateContact)
      .subscribe( _ => {
        this.router.navigateByUrl('/contacts');
      })
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}

