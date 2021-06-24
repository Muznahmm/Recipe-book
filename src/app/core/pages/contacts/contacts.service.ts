import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';
import * as API from '../../../helpers/apis/contacts';
import { ContactsData } from '../../../helpers/types/contacts.types';

@Injectable({
    providedIn: 'root',
})

export class ContactsService {
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    fetchContacts() {
        const token = this.authService.getAuthToken();
        const headers = new HttpHeaders({
            'content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        return this.http.get(API.GET_CONTACTS, { headers }) as Observable<ContactsData>;
    }
}