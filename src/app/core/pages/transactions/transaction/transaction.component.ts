import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/Operators';


import { ContactData, CrudEventTypes, TransactionData, TransactionTypeCode } from 'src/app/helpers/types';
import { ContactsService } from '../../contacts/contacts.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';


@Component({
  selector: 'mm-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  @Input('transaction') txn!: TransactionData;
  @Input('isLast') isLast!: boolean;
  //To hide contact name that already have contact name mentioned above
  @Input('hideContactName') hideName!: boolean; 

  @Output('refresh') refreshList = new EventEmitter();

  private fetchContactHttp$!: Observable<ContactData>
  
  constructor(
    private contactService: ContactsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(){
    this.fetchContactHttp$ = this.contactService
    .fetchContactById(this.txn.contactId)
    .pipe(
      shareReplay()
    );
  }

  getContactName(){
    //It triggers view life cycle when any changes is happen so it is a bad way
    
    // return this.contactService
    // .fetchContactById(this.txn.contactId)
    // .subscribe( res => {
    //   return res.firstName;
    // })

    //Better approach 
    //ShareReplay: It give API call response as replay
    // return this.fetchContactHttp$
    // .subscribe(res => {
    //   console.log(res);
    //   // The O/p show [object object] because it return Observable so better way to show a name is 
    //   return res.firstName;
    // })

    // return this.fetchContactHttp$
    // .pipe(
    //   map( res => `${res.firstName} ${res.lastName}`),
    // );

    // Using much better method by state transfer
    const contact = this.contactService.getContactById(this.txn.contactId);
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Loading...';
  }

  get containerStyleClass() {
    return (
      (this.txn.type === TransactionTypeCode.OWES_YOU) ? 'Owes_you': 'Is_owed'
    );
  }

  get transactionType() {
    return (
      (this.txn.type === TransactionTypeCode.OWES_YOU) ? 'Owes_you': 'Is_owed'
    );
  }

  get transactionNote() {
    return this.txn.note ? this.txn.note : 'No notes provided!' ;
  }

  get description() {
    return this.txn.description ? this.txn.description : 'No description provided!';
  }

  public onButtonAction(type: CrudEventTypes) {
    switch(type) {
      case 'edit': this.onEditTransaction();
      break;

      case 'visibility': this.onViewTransaction();
      break;

      case 'delete': this.onDeleteTransaction();
      break;
    }
  }
  
  public onEditTransaction() {
    this.dialog.open(TransactionFormComponent, {
      width: '500px',
      data: {
        mode: 'edit',
        transaction: this.txn,
        afterCreate: () => {
         this.refreshList.emit();
        },
      },
    });
  }

  public onViewTransaction(): void {

  }

  public onDeleteTransaction(): void {

  }
}
