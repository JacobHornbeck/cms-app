import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Document } from './document.model';

@Injectable({
    providedIn: 'root',
})
export class DocumentService {
    documentsChangedEvent = new Subject<Document[]>();
    documentUpdated = new Subject<Document>();
    private documents: Document[] = [];

    private documentsHaveChanged(newDocuments: Document[] = null) {
        if (newDocuments != null)
            this.documents = newDocuments
        this.documents.sort((doc1: Document, doc2: Document) => {
            return doc1.name > doc2.name ? 1 : -1;
        });
        this.documentsChangedEvent.next(this.documents.slice());
    }
    sortedDocuments(documents: Document[]) {
        if (!documents) return []
        return documents.sort((doc1: Document, doc2: Document) => {
            return doc1.name > doc2.name ? 1 : -1;
        });
    }

    constructor(private http: HttpClient) {
        http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
            .subscribe(
                (result: { message: string, documents: Document[] }) => { this.documents = result.documents },
                (error: any) => { console.log(error); }
            );
    }

    addDocument(document: Document) {
        if (!document) return
        document.id = '';
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http
            .post<{ message: string; document: Document }>('http://localhost:3000/documents', document, { headers: headers })
            .subscribe((responseData) => {
                this.documents.push(responseData.document);
                this.documentsHaveChanged()
            });
    }
    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) return

        const pos = this.documents.findIndex(d => d.id === originalDocument.id);
        if (pos < 0) return

        newDocument.id = originalDocument.id;
        newDocument._id = originalDocument._id;

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http
            .put('http://localhost:3000/documents/' + originalDocument.id, newDocument, { headers: headers })
            .subscribe(() => {
                this.documents[pos] = newDocument
                this.documentsHaveChanged()
                this.documentUpdated.next(newDocument)
            });
    }
    deleteDocument(document: Document) {
        if (!document) return

        const pos = this.documents.findIndex((d) => d.id === document.id);
        if (pos < 0) return

        this.http
            .delete('http://localhost:3000/documents/' + document.id)
            .subscribe(() => {
                this.documents.splice(pos, 1);
                this.documentsHaveChanged()
            });
    }
    getDocument(id: string) {
        return this.http.get(`http://localhost:3000/documents/${id}`)
    }
    getDocuments() {
        return this.http.get('http://localhost:3000/documents/')
    }
}
