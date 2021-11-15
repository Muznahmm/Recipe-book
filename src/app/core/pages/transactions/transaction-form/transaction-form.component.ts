import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreateOrUpdateTransactionData, TransactionData, TransactionFormOption, TransactionFromField } from 'src/app/helpers/types';
import { ContactsService } from '../../contacts/contacts.service';
import { TransactionFromService } from './transaction-form.service';

interface ModelData {
  mode: 'create' | 'edit' | 'view';
  transaction?: TransactionData,
  afterCreate?: () => void;
}

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  public buttonName = "Add";
  public title = "New Transaction";

  public formModel: TransactionFromField[] = [];
  public contactOptions: TransactionFormOption[] = [];
  public form!: FormGroup;

  
  constructor(
    private transactionFormService: TransactionFromService,
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModelData,
  ) { }

  ngOnInit(): void {
    this.formModel = this.transactionFormService.getTransactionFormModel();
    this.createForm();

    this.contactsService.getContactOption()
    .subscribe(contactOptions => {
      
      const index = this.formModel.findIndex(model => {
        return model.fieldName === 'contactId';
      });

      if (index !== -1) {
        this.formModel[index].options = contactOptions;
        
        if (contactOptions.length > 0) {
          const control = this.getControl('contactId');
          if(!control.value) {
           control.setValue(contactOptions[0].value);
          }
        }
      }
    })

  }

  private getControl(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if(!this.form.valid) {
      return;
    }

    const {
      contactId,
      type,
      amount,
      note,
      description,
      dateTime,
    } = this.form.value;

    const submittedData: CreateOrUpdateTransactionData = {
      contactId,
      type,
      amount: +amount,
      note,
      description,
      dateTime: new Date(dateTime).getTime(),
    };

    switch(this.data.mode) {
      case 'create': this.transactionFormService.createTransaction(submittedData)
      .subscribe(_ => {
        if (this.data.afterCreate){
          this.data.afterCreate();
        }
        this.dialogRef.close();
      });
      break;

      case 'edit': this.transactionFormService
      .editTransaction(this.data.transaction!.id, submittedData)
      .subscribe(_ => {
        if (this.data.afterCreate){
          this.data.afterCreate();
        }
        this.dialogRef.close();
      });
      break;

      case 'view': 
      break;

      // case : break;
    }
    
    
  }

  private createForm(): void {
    const formControls: { [key: string]: any; } = {};
    for (const field of this.formModel) {
      
      const formControl = [];
      
      switch(field.elementType) {
        case 'select': 
        // Because it an optional we need to use conditions
        if (field.options && (field.options.length > 0)) {
          // To make first option default choice
          formControl.push(field.options[0].value);
        } else {
          formControl.push(null);
        }

        if (field.shouldFetchOptions) {
          if (field.fieldName === 'contactId'){
            // To show first contact as default choice
            this.contactsService.fetchContacts().subscribe();
          }
        }
        break;

        case 'dateTimePicker':
        const currentDate = new Date().toISOString();
        formControl.push(currentDate);
        break;
          
        default: 
        formControl.push(null);
        break;
      }

      if ((this.data.mode === 'edit') && this.data.transaction) {
        this.buttonName = 'Update';
        this.title = 'Edit Transaction';

        const fieldData = this.data.transaction[field.fieldName];

        if (field.elementType === 'dateTimePicker') {
          formControl[0] = new Date(fieldData).toISOString();
          console.log(formControl[0]);
        } else {
          formControl[0] = fieldData;
        }
      }

      if ((this.data.mode === 'view') && this.data.transaction) {
        this.title = 'View Transaction';
        const fieldData = this.data.transaction[field.fieldName];

        if (field.elementType === 'dateTimePicker') {
          formControl[0] = new Date(fieldData).toISOString();
          console.log(formControl[0]);
        } else {
          formControl[0] = fieldData;
        }
      }

      const synchronusValidator: ValidatorFn[] = [];
      if (field.isRequired) {
        synchronusValidator.push(Validators.required);
      }

      formControl.push(synchronusValidator);
      formControls[field.fieldName] = formControl;
    }
    this.form = this.fb.group(formControls);
  }

}
