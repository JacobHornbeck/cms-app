import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    documentChanged = new EventEmitter<Document>();
    documentsChangedEvent = new EventEmitter<Document[]>();
    private selectedDocument: Document;
    private documents: Document[];

    constructor() {
        this.documents = MOCKDOCUMENTS;
    }

    /* addDocument(document: Document) {
        this.documents.push(document);
        this.documentsChangedEvent.emit(this.documents);
    } */
    deleteDocument(id: string) {
        this.documents = this.documents.filter((document: Document) => {
            return document.id !== id;
        })
        this.documentsChangedEvent.emit(this.documents);
    }
    selectDocument(document: Document) {
        this.selectedDocument = document;
        this.documentChanged.emit(this.selectedDocument);
    }
    getDocument(id: string) {
        return this.documents.find(document => document.id === id);
    }
    getDocuments() {
        return this.documents.slice();
    }
}
