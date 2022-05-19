import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    documentChanged = new EventEmitter<Document>();
    private selectedDocument: Document;
    private documents: Document[];

    constructor() {
        this.documents = MOCKDOCUMENTS;
    }

    /* addDocument(document: Document) {
        this.documents.push(document);
    } */
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
