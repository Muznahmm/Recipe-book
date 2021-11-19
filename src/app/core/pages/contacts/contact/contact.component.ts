import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


import { ContactData, CrudEventTypes } from 'src/app/helpers/types';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/UI/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input('contactToDisplay') contact!: ContactData;

  @Output('refresh') refresh = new EventEmitter(); 
  
  private deleteModalRef!: MatDialogRef<DeleteConfirmationDialogComponent>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private contactsService: ContactsService,
    private notifierService: NotifierService,
  ) { }

  ngOnInit(): void {
  }

  onCaptureEvent(e: CrudEventTypes){
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
        this.onConfirmDelete();
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

  onConfirmDelete() {
    this.deleteModalRef = this.dialog
    .open(DeleteConfirmationDialogComponent, {
      data: { 
        title: "Are you sure you want to delete this contact ?",
        description: "Deleting this contact will permanently remove it.",
        deleteFunc: this.deleteContact,
      }
    })
  }

  private deleteContact = () => {
    this.contactsService
    .deleteContact(this.contact.id)
    .subscribe(res => {
      
      this.notifierService
      .notify('success', 'Contact Deleted Successfully!');

      if(res.success) {
        this.deleteModalRef.close();
        this.refresh.emit();
      }
    })
  }

}
