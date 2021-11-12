import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/Operators';
import { TransactionFormOption } from 'src/app/helpers/types';

import * as API from '../../../helpers/apis/contacts';
import { ContactsData, ContactData } from '../../../helpers/types/contacts.types';

@Injectable({
    providedIn: 'root',
})

export class ContactsService {
    public contacts: ContactData[] = [];

    private subject = new BehaviorSubject<ContactData[]>([]);

    // Make a subject to Observable
    contact$ = this.subject.asObservable();

    /**
     * It will add all induvidually fetched ids
     */
    public contactIdsBeingFetched: number[] = [];

    constructor(
        private http: HttpClient,
    ) { }

    public fetchContacts() {
        return this.http.get<ContactsData>(API.GET_CONTACTS)
        .pipe(
            tap(res => {
                // for(const contact of res.contacts) {
                    /**
                     * List all contact that are being added 
                     * to the private array of contact
                     */
                //     this.updateContactList(contact);
                // }
                this.updateContactsInStore(res.contacts);
            }),
        );
    }

    public getContactOption() {
        return this.contact$.pipe(
            map(contacts => {
                const formattedContacts: TransactionFormOption[] = [];
                
                for (const contact of contacts) {
                    
                    formattedContacts.push ({ 
                        text: `${ contact.firstName } ${contact.lastName}`,
                        value: contact.id,
                    });
        
                }
        
                return formattedContacts;
            }),
        
        );
        
    }

    public getContactById(id: number): ContactData | undefined {
        // const contact = this.contacts.find(c => c.id === id);

        const contact = this.subject.getValue().find(c => c.id === id);


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

    public fetchContactById(id: number) {
        return this.http.get<ContactData>(`${API.GET_CONTACT}/${id}`)
        .pipe(
            tap( contact => {
                this.updateContactInStore(contact);
            }),
        );
    }

    public deleteContact(id: number) {
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

    public removeContactFromList(id: number) {
        const contacts = this.subject.getValue();
        const index = contacts.findIndex(c => c.id === id );
        // It remove contacts from contacts array
        if(index !== -1) {
            const copyOfContacts = [ ...contacts];

            copyOfContacts.splice(index, 1);
        }
    }

    private updateContactInStore(contact: ContactData): void {
        const copyOfContacts = [...this.subject.getValue()];

        const indexOfContact = copyOfContacts.findIndex(c => c.id === contact.id);

        // Update contact in the list (instead of having partial obj we gave detailed obj)
        if (indexOfContact === -1) {
            copyOfContacts.push(contact);
        } else {
            copyOfContacts[indexOfContact] = { ...copyOfContacts[indexOfContact], ...contact }
        };

        // it check if there is a contact that is being fetched in contactIdBeingFetched
        const indexOfIdBeingFetched = this.contactIdsBeingFetched.indexOf(contact.id);
        // If there is  then it removes from contactIdsBeingFetched array
        if(indexOfIdBeingFetched !== -1) {
            this.contactIdsBeingFetched.splice(indexOfIdBeingFetched, 1);
        }
        // Make sure to call next so that you can get the data
        this.subject.next(copyOfContacts);
    }

    private updateContactsInStore(contacts: ContactData[]) {
        // It will give new contact that stored in backend.
        // const indexOfContact = this.contacts.findIndex(c => c.id === contact.id);

        const copyOfContacts = [ ...this.subject.getValue() ];
            
        // Checking is there any contact that match
        for ( let contact of contacts) {
            const index = copyOfContacts.findIndex(c => c.id === contact.id);

            if (index === -1) {
                copyOfContacts.push(contact);
            } else {
                copyOfContacts[index] = {...copyOfContacts[index], ...contact};
            };
        };
        
        this.subject.next(copyOfContacts);
    }

}