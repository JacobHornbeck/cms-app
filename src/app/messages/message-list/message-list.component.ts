import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../message.model';

@Component({
    selector: 'cms-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
    messages: Message[];

    constructor(private messageService: MessageService) { }
    ngOnInit(): void {
        this.messages = this.messageService.getMessages();
        this.messageService.messagesChanged.subscribe(messages => {
            this.messages = messages;
        })
    }

    onAddMessage(message: Message) {
        this.messages.push(message);
    }
}
