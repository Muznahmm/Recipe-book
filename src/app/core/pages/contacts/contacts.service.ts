import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/Operators';

import { AuthService } from '../../../auth/auth.service';
import * as API from '../../../helpers/apis/contacts';
import { ContactsData, ContactData } from '../../../helpers/types/contacts.types';

@Injectable({
    providedIn: 'root',
})

export class ContactsService {
    contacts: ContactData[] = [];
    contactIdsBeingFetched: number[] = []

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    fetchContacts() {
        return this.http.get(API.GET_CONTACTS) as Observable<ContactsData>;
    }

    fetchContactById(id: number) {
        return this.http.get<ContactData>(`${API.GET_CONTACT}/${id}`)
        // .pipe(
        //     tap( contact => {
        //         //this.updateContactList(contact);
        //     })
        // )
    }

    // getContactById(id: number): ContactData | undefined {
    //     const contact = this.contacts.find(c => c.id === id);

    //     if(!contact) {
    //         if(this.contactIdsBeingFetched.indexOf(id) === -1) {
    //             this.contactIdsBeingFetched.push(id);
    //             this.fetchContactById(id).subscribe()
    //         }
    //     }
    // }

    // updateContactList(contact: ContactData) {
    //     const indexOfContact = this.contacts.find(c => c.id === contact.id);

    //     if(indexOfContact === -1) {
    //         this.contacts.push(contact);
    //     } else {
    //         this.contacts.indexOf[indexOfContact] = contact; 
    //     }
        
    // }

    deleteContact(id: number) {
        return this.http.delete<{success: boolean}>(`${API.DELETE_CONTACT}/${id}`);
    }
}