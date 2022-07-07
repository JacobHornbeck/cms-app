import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/contacts/contact.service';

import { Contact } from "../../contacts/contact.model";
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
    selector: 'cms-message-edit',
    templateUrl: './message-edit.component.html',
    styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
    @ViewChild('msgSubject') subjectRef: ElementRef;
    @ViewChild('msgText') textRef: ElementRef;
    currentSender: Contact;

    constructor(private messageService: MessageService,
                private contactService: ContactService) { }
    ngOnInit(): void {
        this.contactService.getContact('101')
            .subscribe((result: { message: string, contact: Contact }) => {
                this.currentSender = result.contact
            })
    }

    onAddMessage(f: NgForm) {
        const message = {
            subject: f.value.subject,
            msgText: f.value.message
        };
        const newMessage = new Message(
            '',
            message.subject,
            message.msgText,
            this.currentSender
        );
        this.subjectRef.nativeElement.value = "";
        this.textRef.nativeElement.value = "";
        this.messageService.addMessage(newMessage);
    }
    onClear() {
        this.subjectRef.nativeElement.value = "";
        this.textRef.nativeElement.value = "";
    }
}
