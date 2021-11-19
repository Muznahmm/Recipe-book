import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

import { ContactFormService } from './contact-form.service';
import { ContactsService } from '../contacts.service';
import { FormCanDeactivate } from 'src/app/utils/guards/form-can-deactivate';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})

export class ContactFormComponent extends FormCanDeactivate implements OnInit {
  @ViewChild('contactFrom') form!: NgForm;

  private contactId?: number;

  title = 'New Contact';
  buttonName = 'Create';

  constructor(
    private contactFormService: ContactFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private notifierService: NotifierService
  ) {
    super();
  }

  get formRef() {
    return this.form;
  }

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

  public onContactForm(): void {
    if(!this.contactId){
      this.contactFormService
          .createContact(this.form.value)
          .subscribe( _ => {
            /*While submitting the form it also thinks it dirty 
             *and shows alert msg to make form pure we use reset fuction
             */
            this.notifierService
            .notify('success', 'Contact Created Successfully');
            
            this.form.reset();
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
        
        this.notifierService
        .notify('success', 'Contact Updated Successfully');

        this.form.reset();
        this.router.navigateByUrl('/contacts');
      })
    }
  }

}

