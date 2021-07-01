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
}

export interface TransactionResponse {
    transactions: TransactionData[];
}