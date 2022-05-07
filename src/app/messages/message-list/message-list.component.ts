import { Component, OnInit } from '@angular/core';
import { Message } from '../messages.model';

@Component({
    selector: 'cms-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
    messages: Message[] = [
        new Message('1', 'Test Message', 'This is a test', 'Jacob Hornbeck')
    ]

    constructor() { }
    ngOnInit(): void { }

    onAddMessage(message: Message) {
        this.messages.push(message);
    }
}
