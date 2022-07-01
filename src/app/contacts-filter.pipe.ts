import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contacts/contact.model';

@Pipe({
    name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
    transform(contacts: Contact[], term: string): any {
        if (!contacts) return;
        if (!term) return contacts.slice();
        
        return contacts.filter(contact => {
            return contact.name.toLowerCase().includes(term.toLowerCase())
        });
    }
}
