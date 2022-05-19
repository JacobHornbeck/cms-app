import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from "./MOCKCONTACTS";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contactSelected = new EventEmitter<Contact>();
    // contactsChanged = new EventEmitter<Contact[]>();
    selectedContact: Contact;
    private contacts: Contact[] = [];

    constructor() {
        this.contacts = MOCKCONTACTS;
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
