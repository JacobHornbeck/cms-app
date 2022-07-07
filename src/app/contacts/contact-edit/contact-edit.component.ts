import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';

@Component({
    selector: 'cms-contact-edit',
    templateUrl: './contact-edit.component.html',
    styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {
    id: string;
    contact: Contact;
    editMode = false;
    isError = false;
    errorMessage: String;
    groupContacts: Contact[] = [];
    subscription: Subscription;

    private isInvalidContact(newContact: Contact) {
        if (!newContact) return 'not found';
        if (this.contact && newContact.id === this.contact.id) return 'the current contact';
        for (let i = 0; i < this.groupContacts.length; i++) {
            if (newContact.id === this.groupContacts[i].id) return 'already in the group';
        }
        return false;
    }

    constructor(private router: Router,
                private route: ActivatedRoute,
                private contactService: ContactService) {}
    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id']
            this.editMode = params['id'] != null;
            if (this.id) {
                this.contactService.getContact(this.id)
                    .subscribe((result: { message: String, contact: Contact }) => {
                        this.contact = result.contact
                    })
                this.groupContacts = this.contact.group ? Array.from(this.contact.group) : [];
            }
        })
        this.subscription = this.contactService.contactGroupError.subscribe((message: String) => {
            this.isError = true;
            this.errorMessage = message;
        })
    }

    onSubmit(form: NgForm) {
        let newContact = new Contact('0', form.value.name, form.value.email, form.value.phone, form.value.imageUrl, this.groupContacts);
        if (this.editMode) this.contactService.updateContact(this.contact, newContact);
        else this.contactService.addContact(newContact);
        this.onCancel();
    }

    onCancel() {
        if (this.editMode) this.router.navigate(['/contacts', this.id]);
        else this.router.navigate(['/contacts'])
    }

    addToGroup($event: any) {
        const selectedContact: Contact = $event.dragData;
        const errorMessage = this.isInvalidContact(selectedContact);
        if (errorMessage) {
            this.contactService.contactGroupError.next(errorMessage);
            return;
        }
        this.isError = false;
        this.groupContacts.push(selectedContact);
    }

    onRemoveItem(index: number) {
        this.groupContacts = this.groupContacts.filter((el: any, i: number) => i !== index);
        this.isError = false;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
