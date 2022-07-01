import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root',
})
export class DocumentService {
    documentsChangedEvent = new Subject<Document[]>();
    startEditing = new Subject<string>();
    private documents: Document[] = [];
    private maxDocumentId: number;
    private getMaxId(): number {
        return this.documents.reduce((prev: number, document: Document) => {
            return +document.id > prev ? +document.id : prev;
        }, 0);
    }

    private documentsHaveChanged(newDocuments: Document[]) {
        this.documents = newDocuments;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((doc1: Document, doc2: Document) => {
            return doc1.name > doc2.name ? 1 : -1;
        });
        this.documentsChangedEvent.next(this.documents.slice());
    }

    constructor(private http: HttpClient) {
        http.get<Document[]>('https://wdd430-project-default-rtdb.firebaseio.com/documents.json')
            .subscribe(
                (documents: Document[]) => { this.documentsHaveChanged(documents); },
                (error: any) => { console.log(error); }
            );
    }

    storeDocuments(documents: Document[]) {
        const httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });
        this.http
            .put(
                'https://wdd430-project-default-rtdb.firebaseio.com/documents.json',
                documents,
                { headers: httpHeaders }
            )
            .subscribe(
                (documents: Document[]) => { this.documentsHaveChanged(documents); },
                (error: any) => { console.log(error); }
            );
    }

    addDocument(document: Document) {
        if (!document) return;

        this.maxDocumentId++;
        document.id = this.maxDocumentId.toString();
        this.documents.push(document);
        this.storeDocuments(this.documents.slice());
    }
    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) return;

        let i = this.documents.indexOf(originalDocument);
        if (i < 0) return;

        newDocument.id = originalDocument.id;
        this.documents[i] = newDocument;
        this.storeDocuments(this.documents.slice());
    }
    deleteDocument(id: string) {
        this.documents = this.documents.filter((document: Document) => {
            return document.id !== id;
        });
        this.storeDocuments(this.documents.slice());
    }
    getDocument(id: string) {
        return this.documents.find((document) => document.id === id);
    }
    getDocuments() {
        return this.documents.slice();
    }
}
