import { Component, Input, OnInit } from '@angular/core';

import { ContactService } from '../../../contacts/contact.service';
import { Contact } from "../../../contacts/contact.model";
import { Message } from '../../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
    @Input() message: Message;
    messageSender: string;

    constructor(private contactService: ContactService) { }
    ngOnInit(): void {
        this.contactService.getContact(this.message.sender.id)
            .subscribe((contact: Contact) => {
                this.messageSender = contact.name;
            })
    }
}
