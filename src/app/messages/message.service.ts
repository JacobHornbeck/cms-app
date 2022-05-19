import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messagesChanged = new EventEmitter<Message[]>();
    private messages: Message[];

    constructor() {
        this.messages = MOCKMESSAGES;
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.messagesChanged.emit(this.messages);
    }
    getMessage(id: string) {
        return this.messages.find(message => message.id === id);
    }
    getMessages() {
        return this.messages.slice();
    }
}
