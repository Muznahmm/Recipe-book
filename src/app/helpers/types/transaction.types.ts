export enum TransactionTypeCode {
    YOU_OWE,
    OWES_YOU,
}

export interface TransactionData {
    id: number;
    accountId: number;
    contactId: number;
    type: TransactionTypeCode;
    amount: number;
    dateTime: number;
    note: string;
    description: string;
    createdAt: number;
    updatedAt: number;
    [key: string]: any;
}

export interface TransactionResponse {
    transactions: TransactionData[];
}

export interface TransactionFormOption {
    text: string;
    value: any;
}

export interface TransactionFromField {
    fieldName: string;
    displayName?: string;
    inputType?: 'text' | 'number' | 'email' | 'password';
    elementType: 'select' | 'input' | 'textarea' | 'dateTimePicker';
    isRequired?: boolean;
    shouldFetchOptions?: boolean;
    options?: TransactionFormOption[];
    isNumber?: boolean;
}

export interface CreateOrUpdateTransactionData {
    contactId: number;
    type: number;
    amount: number;
    dateTime: number;
    note: string;
    description: string;
}

export interface TransactionSummary {
    youOwe: number;
    owesYou: number;
}