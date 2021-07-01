import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/Operators';


import { ContactData, TransactionData, TransactionTypeCode } from 'src/app/helpers/types';
import { ContactsService } from '../../contacts/contacts.service';


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

  private fetchContactHttp$!: Observable<ContactData>
  
  constructor(
    private contactService: ContactsService,
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
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Loading';
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

  
}
