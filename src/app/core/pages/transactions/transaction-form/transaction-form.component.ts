import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreateOrUpdateTransactionData, TransactionData, TransactionFormOption, TransactionFromField } from 'src/app/helpers/types';
import { ContactsService } from '../../contacts/contacts.service';
import { TransactionFromService } from './transaction-form.service';

interface ModelData {
  mode: 'create' | 'edit' | 'view';
  transaction?: TransactionData;
  contactId?: number;
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

  private disableButton = false;

  
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


  // Not working why???
  // public shouldDisableField(controlName: string): boolean {
  //   if ((controlName === 'contactId') && this.data.contactId) {
  //     return true;
  //   }

  //   return false;
  // }

  private getControl(controlName: string): AbstractControl {
    return this.form.controls[controlName];
  }

  public hasError(controlName: string): boolean {
    const control = this.getControl(controlName);
    return control.invalid && control.touched;
  }

  public getFieldError(controlName: string): string {
    const control = this.getControl(controlName);
    return 'This field is required!';
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
      case 'create':
      this.disableButton = true;
      
      this.transactionFormService.createTransaction(submittedData)
      .subscribe(_ => {
        if (this.data.afterCreate){
          this.data.afterCreate();
        }
        this.dialogRef.close();
      });
      break;

      case 'edit':
        this.disableButton = true;
      this.transactionFormService
      .editTransaction(this.data.transaction!.id, submittedData)
      .subscribe(_ => {
        if (this.data.afterCreate){
          this.data.afterCreate();
        }
        this.dialogRef.close();
      });
      break;
    }
    
    
  }

  private createForm(): void {
    const formControls: { [key: string]: any; } = {};
    for (const field of this.formModel) {
      
      const formControl = [];
      let initialValue: any = '';

      switch(field.elementType) {
        case 'select':
          initialValue = null;

          if (field.options && (field.options.length > 0)) {
            // Make the first option the default choice.
            initialValue = field.options[0].value;
          }

          if ((field.fieldName === 'contactId') && this.data.contactId) {
            initialValue = this.data.contactId;
          }

          // formControl.push(initialValue);

          if (field.shouldFetchOptions) {
            if (field.fieldName === 'contactId') {
              // Trigger fetching of contacts list.
              this.contactsService.fetchContacts().subscribe();
            }
          }
          break;

        case 'dateTimePicker':
        // const currentDate = new Date().toISOString();
        // formControl.push(currentDate);
        initialValue = new Date().toISOString();
        break;
          
        default: initialValue = ''
        break;
      }

      if (this.data.transaction) {
        switch(this.data.mode) {
          case 'edit': 
          this.buttonName = 'Update';
          this.title = 'Edit Transaction';
          break;
          case 'view':
          this.title = 'View Transaction';
          break;
        }

        const fieldData = this.data.transaction[field.fieldName];

        if (field.elementType === 'dateTimePicker') {
          new Date(fieldData).toISOString();
        } else {
          initialValue = fieldData;
        }

        if (field.elementType === 'dateTimePicker') {
          initialValue = new Date(fieldData).toISOString();
        } else {
          initialValue = fieldData;
        }
      }


      const synchronusValidator: ValidatorFn[] = [];
      
      if (field.isRequired) {
        synchronusValidator.push(Validators.required);
      }

      let isDisable = false;
      let showButton = true;

      if (this.data.mode === 'view') {
        isDisable = true;
      }

      if ((field.fieldName === 'contactId') && this.data.contactId) {
        isDisable = true;
      }

      // formControl.push(synchronusValidator);
      formControls[field.fieldName] = [
        {
          value: initialValue,
          disabled: isDisable,
        },
        synchronusValidator
      ];
    }
    this.form = this.fb.group(formControls);
  }

}
