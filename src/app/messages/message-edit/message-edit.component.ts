import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../messages.model';

@Component({
    selector: 'cms-message-edit',
    templateUrl: './message-edit.component.html',
    styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
    @ViewChild('msgSubject') subjectRef: ElementRef;
    @ViewChild('msgText') textRef: ElementRef;
    @Output() messageAdded = new EventEmitter<Message>();

    constructor() { }
    ngOnInit(): void { }

    onAddMessage() {
        const message = {
            subject: this.subjectRef.nativeElement.value,
            msgText: this.textRef.nativeElement.value
        };
        const newMessage = new Message((Math.floor(Math.random()*100)+1).toString(), message.subject, message.msgText, 'Jacob Hornbeck');
        this.subjectRef.nativeElement.value = "";
        this.textRef.nativeElement.value = "";
        this.messageAdded.emit(newMessage);
    }
    onClear() {
        this.subjectRef.nativeElement.value = "";
        this.textRef.nativeElement.value = "";
    }
}
