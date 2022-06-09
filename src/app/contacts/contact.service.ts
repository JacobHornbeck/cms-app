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
    private maxContactId: number;
    private getMaxId(): number {
        return this.contacts.reduce((prev: number, contact: Contact) => {
            return +contact.id > prev ? +contact.id : prev
        }, 0);
    }

    constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
    }

    addContact(contact: Contact) {
        if (!contact) return;

        this.maxContactId++;
        contact.id = this.maxContactId.toString();
        this.contacts.push(contact);
        this.contactsChangedEvent.next(this.contacts.slice());
    }
    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) return;

        let i = this.contacts.indexOf(originalContact);
        if (i < 0) return;

        newContact.id = originalContact.id;
        this.contacts[i] = newContact;
        this.contactsChangedEvent.next(this.contacts.slice());
    }
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
