import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TransactionResponse, TransactionSummary } from 'src/app/helpers/types';
import * as API from '../../../helpers/apis';
import { DELETE_TRANSACTION } from '../../../helpers/apis';

@Injectable({
    providedIn: 'root',
})

export class TransactionsService {
    constructor(
        private http: HttpClient,
    ) { }

    fetchTransactionsOfContact(id: number) {
        return this.http
      .get<TransactionResponse>(`${API.GET_CONT_TRANSACTIONS}/${id}`);
    }

    fetchTransactionsOfAccount() {
        return this.http.get<TransactionResponse>(API.GET_ACCOUNT_TRANSACTIONS);
    }

    public deleteTransacton(id: number) {
        return this.http.delete<{success: boolean}>(`${DELETE_TRANSACTION}/${id}`)
    }

    public fetchAccountSummary() {
        return this.http.get<TransactionSummary>(API.GET_ACCOUNT_TXN_SUMMARY);
    }
}