import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';
import * as API from '../../../helpers/apis/contacts';
import { ContactsData, ContactData } from '../../../helpers/types/contacts.types';

@Injectable({
    providedIn: 'root',
})

export class ContactsService {
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    fetchContacts() {
        return this.http.get(API.GET_CONTACTS) as Observable<ContactsData>;
    }

    fetchContactById(id: number) {
        return this.http.get<ContactData>(`${API.GET_CONTACT}/${id}`);
    }
}