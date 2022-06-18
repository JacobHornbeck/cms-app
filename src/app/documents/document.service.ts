import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    documentChanged = new Subject<Document>();
    documentsChangedEvent = new Subject<Document[]>();
    startEditing = new Subject<string>();
    private selectedDocument: Document;
    private documents: Document[];
    private maxDocumentId: number;
    private getMaxId(): number {
        return this.documents.reduce((prev: number, document: Document) => {
            return +document.id > prev ? +document.id : prev
        }, 0);
    }

    constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }


    addDocument(document: Document) {
        if (!document) return;

        this.maxDocumentId++;
        document.id = this.maxDocumentId.toString();
        this.documents.push(document);
        this.documentsChangedEvent.next(this.documents.slice());
    }
    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) return;

        let i = this.documents.indexOf(originalDocument);
        if (i < 0) return;

        newDocument.id = originalDocument.id;
        this.documents[i] = newDocument;
        this.documentsChangedEvent.next(this.documents.slice());
    }
    deleteDocument(id: string) {
        this.documents = this.documents.filter((document: Document) => {
            return document.id !== id;
        })
        this.documentsChangedEvent.next(this.documents);
    }
    selectDocument(document: Document) {
        this.selectedDocument = document;
        this.documentChanged.next(this.selectedDocument);
    }
    getDocument(id: string) {
        return this.documents.find(document => document.id === id);
    }
    getDocuments() {
        return this.documents.slice();
    }
}
