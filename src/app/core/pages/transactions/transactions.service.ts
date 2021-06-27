import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ContactTransactionResponse } from 'src/app/helpers/types';
import * as API from '../../../helpers/apis';

@Injectable({
    providedIn: 'root',
})

export class TransactionsService {
    constructor(
        private http: HttpClient,
    ) { }

    fetchTransactionsOfContact(id: number) {
        return this.http
      .get<ContactTransactionResponse>(`${API.GET_CONT_TRANSACTIONS}/${id}`);
    }
}