import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from 'src/app/helpers/apis';
import { CreateOrUpdateTransactionData, TransactionData, TransactionFromField, TransactionTypeCode } from 'src/app/helpers/types';

@Injectable({
    providedIn: 'root',
})

export class TransactionFromService {
    constructor(
        private http: HttpClient,
    ) {}

    public createTransaction(data: CreateOrUpdateTransactionData) {
        return this.http.post<TransactionData>(CREATE_TRANSACTION, data);
    }

    public editTransaction(txnId: number, data: CreateOrUpdateTransactionData) {
        return this.http.patch<TransactionData>(`${UPDATE_TRANSACTION}/${txnId}`, data)
    }

    // public viewTransacton(txnId: number) {
    //     return this.http.get(`${VIEW}/${txnId}`)
    // }
    
    getTransactionFormModel(): TransactionFromField[] {
        return [
            {
                fieldName: 'contactId',
                displayName: 'Contact',
                isRequired: true,
                elementType: 'select',
                shouldFetchOptions: true,
                options: [],
            },
            {
                fieldName: 'type',
                displayName: 'Transaction Type',
                isRequired: true,
                options: [
                    { text: 'Owes you', value: TransactionTypeCode.OWES_YOU },
                    { text: 'You owe', value: TransactionTypeCode.YOU_OWE },
                ],
                elementType: 'select',
            },
            {
                fieldName: 'amount',
                displayName: 'Amount',
                isRequired: true,
                inputType: 'number',
                elementType: 'input'
            },
            {
                fieldName: 'dateTime',
                displayName: 'Date & Time',
                isRequired: true,
                elementType: 'dateTimePicker'
            },
            {
                fieldName: 'note',
                displayName: 'Note',
                elementType: 'textarea'
            },
            {
                fieldName: 'description',
                displayName: 'Description',
                elementType: 'textarea'
            },
        ];
    }
}
