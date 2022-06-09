import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'cms-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
    documents: Document[];
    documentsSubscription: Subscription

    constructor(private documentService: DocumentService) { }
    ngOnInit(): void {
        this.documents = this.documentService.getDocuments();
        this.documentsSubscription = this.documentService.documentsChangedEvent.subscribe((updatedDocuments: Document[]) => {
            this.documents = updatedDocuments;
        })
    }

    ngOnDestroy(): void {
        this.documentsSubscription.unsubscribe();
    }
}
