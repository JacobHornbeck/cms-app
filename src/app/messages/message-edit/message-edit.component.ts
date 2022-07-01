import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

    constructor(private messageService: MessageService) { }
    ngOnInit(): void { }

    onAddMessage() {
        const message = {
            subject: this.subjectRef.nativeElement.value,
            msgText: this.textRef.nativeElement.value
        };
        const newMessage = new Message('1', message.subject, message.msgText, '2');
        this.subjectRef.nativeElement.value = "";
        this.textRef.nativeElement.value = "";
        this.messageService.addMessage(newMessage);
    }
    onClear() {
        this.subjectRef.nativeElement.value = "";
        this.textRef.nativeElement.value = "";
    }
}
