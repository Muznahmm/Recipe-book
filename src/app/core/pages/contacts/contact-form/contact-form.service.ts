import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import * as API from 'src/app/helpers/apis';
import { ContactData, CreateContactData, UpdateContactData } from 'src/app/helpers/types';

@Injectable({
    providedIn: 'root',
})

export class ContactFormService {
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {}

    createContact(data: CreateContactData) {
        return this.http.post<ContactData>(API.CREATE_CONTACT, data);
    }

    updateContact(data: UpdateContactData) {
        return this.http.patch<ContactData>(API.UPDATE_CONTACT, data);
    }
    
}