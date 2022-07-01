import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    contactsChangedEvent = new Subject<Contact[]>();
    contactGroupError = new Subject<string>();
    private contacts: Contact[] = [];
    private maxContactId: number;
    private getMaxId(): number {
        return this.contacts.reduce((prev: number, contact: Contact) => {
            return +contact.id > prev ? +contact.id : prev;
        }, 0);
    }
    private contactsHaveChanged(newContacts: Contact[]) {
        this.contacts = newContacts;
        this.maxContactId = this.getMaxId();
        this.contacts = this.contacts
            .filter(contact => {
                return !contact.name.toLowerCase().includes("team")
            })
            .sort((contact1: Contact, contact2: Contact) => {
                return contact1.name > contact2.name ? 1 : -1;
            })
            .concat(
                this.contacts
                    .filter(contact => {
                        return contact.name.toLowerCase().includes("team")
                    })
                    .sort((contact1: Contact, contact2: Contact) => {
                        return contact1.name > contact2.name ? 1 : -1;
                    })
            );
        this.contactsChangedEvent.next(this.contacts.slice());
    }

    constructor(private http: HttpClient) {
        http.get<Contact[]>('https://wdd430-project-default-rtdb.firebaseio.com/contacts.json')
            .subscribe(
                (contacts: Contact[]) => { this.contactsHaveChanged(contacts); },
                (error: any) => { console.log(error); }
            );
    }

    storeContacts(contacts: Contact[]) {
        const httpHeaders = new HttpHeaders({
            'content-type': 'application/json',
        });
        this.http
            .put(
                'https://wdd430-project-default-rtdb.firebaseio.com/contacts.json',
                contacts,
                { headers: httpHeaders }
            )
            .subscribe(
                (contacts: Contact[]) => { this.contactsHaveChanged(contacts); },
                (error: any) => { console.log(error); }
            );
    }

    addContact(contact: Contact) {
        if (!contact) return;

        this.maxContactId++;
        contact.id = this.maxContactId.toString();
        this.contacts.push(contact);
        this.storeContacts(this.contacts);
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) return;

        let i = this.contacts.indexOf(originalContact);
        if (i < 0) return;

        newContact.id = originalContact.id;
        this.contacts[i] = newContact;
        this.storeContacts(this.contacts);
    }

    deleteContact(id: string) {
        this.contacts = this.contacts.filter((contact: Contact) => {
            return contact.id !== id;
        });
        this.storeContacts(this.contacts);
    }

    getContacts() {
        return this.contacts.slice();
    }

    getContact(id: string) {
        return this.contacts.find((contact) => contact.id === id);
    }
}
