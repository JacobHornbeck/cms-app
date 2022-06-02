import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
    selector: 'cms-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
    documents: Document[];

    constructor(private documentService: DocumentService) { }
    ngOnInit(): void {
        this.documents = this.documentService.getDocuments();
        this.documentService.documentsChangedEvent.subscribe((updatedDocuments: Document[]) => {
            this.documents = updatedDocuments;
        })
    }
}
