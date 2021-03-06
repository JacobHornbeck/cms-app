import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
    selector: 'cms-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
    contacts: Contact[] = [];
    subscription: Subscription;
    term: string = '';

    constructor(private contactService: ContactService) {}
    ngOnInit(): void {
        this.contactService.getContacts()
            .subscribe((result: { message: String, contacts: Contact[] }) => {
                this.contacts = this.contactService.sortedContacts(result.contacts)
            })
        this.subscription = this.contactService.contactsChangedEvent.subscribe((updatedContacts: Contact[]) => {
            this.contacts = updatedContacts;
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    search(term: string) {
        this.term = term;
    }
}
