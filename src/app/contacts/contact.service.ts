import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contactSelected = new EventEmitter<Contact>();
    contactsChangedEvent = new EventEmitter<Contact[]>();
    selectedContact: Contact;
    private contacts: Contact[] = [];

    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    /* addContact(contact: Contact) {
        this.contacts.push(contact);
        this.contactsChangedEvent.emit(this.contacts);
    } */
    deleteContact(id: string) {
        this.contacts = this.contacts.filter((contact: Contact) => {
            return contact.id !== id;
        })
        this.contactsChangedEvent.emit(this.contacts);
    }
    selectContact(contact: Contact) {
        this.selectedContact = contact;
        this.contactSelected.emit(this.selectedContact);
    }
    getContacts() {
        return this.contacts.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)).slice();
    }
    getContact(id: string) {
        return this.contacts.find(contact => contact.id === id);
    }
}
