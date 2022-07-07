import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Message } from './message.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    messagesChanged = new Subject<Message[]>();
    private messages: Message[] = [];
    private messagesHaveChanged(newMessages: Message[] = null) {
        if (newMessages != null)
            this.messages = newMessages;
        this.messagesChanged.next(this.messages.slice());
    }

    constructor(private http: HttpClient) {
        http.get('http://localhost:3000/messages')
            .subscribe(
                (result: any) => { this.messagesHaveChanged(result.messages); },
                (error: any) => { console.log(error); }
            );
    }

    addMessage(message: Message) {
        if (!message) return
        message.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http
            .post<{ message: string; createdMessage: Message }>('http://localhost:3000/messages', message, { headers: headers })
            .subscribe((responseData) => {
                let subscription: Subscription
                this.messages.push(responseData.createdMessage);
                subscription = this.getMessages().subscribe((result: { message: string, messages: Message[] }) => {
                    this.messagesHaveChanged(result.messages)
                    subscription.unsubscribe();
                })
            });
    }
    getMessage(id: string) {
        return this.http.get(`http://localhost:3000/messages/${id}`)
    }
    getMessages() {
        return this.http.get('http://localhost:3000/messages')
    }
}
