import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messagesChanged = new Subject<Message[]>();
    private messages: Message[] = [];
    private maxMessageId: number;
    private getMaxId(): number {
        return this.messages.reduce((prev: number, message: Message) => {
            return +message.id > prev ? +message.id : prev;
        }, 0);
    }
    private messagesHaveChanged(newMessages: Message[]) {
        this.messages = newMessages;
        this.maxMessageId = this.getMaxId();
        this.messagesChanged.next(this.messages.slice());
    }

    constructor(private http: HttpClient) {
        http.get<Message[]>('https://wdd430-project-default-rtdb.firebaseio.com/messages.json')
            .subscribe(
                (messages: Message[]) => { this.messagesHaveChanged(messages); },
                (error: any) => { console.log(error); }
            );
    }

    storeMessages(messages: Message[]) {
        const httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
        this.http
            .put(
                'https://wdd430-project-default-rtdb.firebaseio.com/messages.json',
                messages,
                { headers: httpHeaders }
            )
            .subscribe(
                (messages: Message[]) => { this.messagesHaveChanged(messages); },
                (error: any) => { console.log(error); }
            );
    }

    addMessage(message: Message) {
        this.maxMessageId++;
        message.id = this.maxMessageId.toString();
        this.messages.push(message);
        this.storeMessages(this.messages);
    }
    getMessage(id: string) {
        return this.messages.find(message => message.id === id);
    }
    getMessages() {
        return this.messages.slice();
    }
}
