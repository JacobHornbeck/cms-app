import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    contactsChangedEvent = new Subject<Contact[]>();
    contactGroupError = new Subject<string>();
    contactUpdated = new Subject<Contact>();
    private contacts: Contact[] = [];
    
    private contactsHaveChanged(newContacts: Contact[] = null) {
        if (newContacts != null)
            this.contacts = newContacts;
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
    sortedContacts(contacts: Contact[]) {
        if (!contacts) return
        return this.contacts
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
    }

    constructor(private http: HttpClient) {
        http.get('http://localhost:3000/contacts')
            .subscribe(
                (result: any) => { this.contactsHaveChanged(result.contacts); },
                (error: any) => { console.log(error); }
            );
    }

    addContact(contact: Contact) {
        if (!contact) return
        contact.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http
            .post<{ message: string, contact: Contact }>('http://localhost:3000/contacts', contact, { headers: headers })
            .subscribe((responseData) => {
                this.contacts.push(responseData.contact);
                this.contactsHaveChanged()
            });
    }
    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) return

        const pos = this.contacts.findIndex(c => c.id === originalContact.id);
        if (pos < 0) return

        newContact.id = originalContact.id;
        newContact._id = originalContact._id;

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http
            .put('http://localhost:3000/contacts/' + originalContact.id, newContact, { headers: headers })
            .subscribe(() => {
                this.contacts[pos] = newContact
                this.contactsHaveChanged()
                this.contactUpdated.next(newContact)
            });
    }
    deleteContact(contact: Contact) {
        if (!contact) return

        const pos = this.contacts.findIndex(c => c.id === contact.id);
        if (pos < 0) return

        this.http
            .delete('http://localhost:3000/contacts/' + contact.id)
            .subscribe(() => {
                this.contacts.splice(pos, 1);
                this.contactsHaveChanged()
            });
    }

    getContacts() {
        return this.http.get('http://localhost:3000/contacts')
    }

    getContact(id: string) {
        return this.http.get(`http://localhost:3000/contacts/${id}`)
    }
}
