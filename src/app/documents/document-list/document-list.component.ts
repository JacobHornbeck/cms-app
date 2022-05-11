import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../documents.model';

@Component({
    selector: 'cms-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
    @Output() onDocumentSelected = new EventEmitter();
    documents: Document[] = [
        new Document('1', 'Document Test 1', 'The first test document', 'https://www.test.com/test-document-1.html'),
        new Document('2', 'Document Test 2', 'The second test document', 'https://www.test.com/test-document-2.html'),
        new Document('3', 'Document Test 3', 'The third test document', 'https://www.test.com/test-document-3.html'),
        new Document('4', 'Document Test 4', 'The fourth test document', 'https://www.test.com/test-document-4.html'),
        new Document('5', 'Document Test 5', 'The fifth test document', 'https://www.test.com/test-document-5.html'),
        new Document('6', 'Document Test 6', 'The sixth test document', 'https://www.test.com/test-document-6.html')
    ]

    constructor() { }
    ngOnInit(): void { }
    
    onDocumentAdd(document: Document) {
        this.documents.push(document);
    }
    documentSelected(document: Document) {
        this.onDocumentSelected.emit(document)
    }
}
