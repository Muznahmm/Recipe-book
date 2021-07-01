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
        return this.http.get<ContactsData>(API.GET_CONTACTS)
        .pipe(
            tap(res => {
                for(const contact of res.contacts) {
                    /**
                     * List all contact that are being added 
                     * to the private array of contact
                     */
                    this.updateContactList(contact);
                }
            })
        );
    }

    fetchContactById(id: number) {
        return this.http.get<ContactData>(`${API.GET_CONTACT}/${id}`)
        .pipe(
            tap( contact => {
                this.updateContactList(contact);
            })
        )
    }

    getContactById(id: number): ContactData | undefined {
        const contact = this.contacts.find(c => c.id === id);

        if(!contact) {
            /** 
             * if there is no contact id then then 
             * it will fetch other wise it return contact
            */
            if(this.contactIdsBeingFetched.indexOf(id) === -1) {
                this.contactIdsBeingFetched.push(id);
                this.fetchContactById(id).subscribe()
            }
        }

        return contact;
    }

    private updateContactList(contact: ContactData) {
        // It will give new contact that stored in backend.
        const indexOfContact = this.contacts.findIndex(c => c.id === contact.id);

        // Update the contact in list
        if(indexOfContact === -1) {
            this.contacts.push(contact);
        } else {
            this.contacts[indexOfContact] = contact; 
        }
        // it check if there is a contact that is being fetched in contactIdBeingFetched
        const indexOfIdBeingFetched = this.contactIdsBeingFetched.indexOf(contact.id);
        // If there is  then it removes from contactIdsBeingFetched array
        if(indexOfIdBeingFetched !== -1) {
            this.contactIdsBeingFetched.splice(indexOfIdBeingFetched, 1);
        }
        
    }

    deleteContact(id: number) {
        return this.http.delete<{success: boolean}>(`${API.DELETE_CONTACT}/${id}`)
        .pipe(
            tap(res => {
                if(res.success){
                    // Remove Contacts from service list
                    this.removeContactFromList(id)
                }
            })
        );
    }

    removeContactFromList(id: number) {
        const index = this.contacts.findIndex(c => c.id === id );
        // It remove contacts from contacts array
        if(index !== -1) {
            this.contacts.splice(index, 1);
        }
    }
}