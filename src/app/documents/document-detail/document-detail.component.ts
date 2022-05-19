import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
    selector: 'cms-document-detail',
    templateUrl: './document-detail.component.html',
    styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
    document: Document;

    constructor(private documentService: DocumentService) { }
    ngOnInit(): void {
        this.documentService.documentChanged.subscribe(document => {
            this.document = document;
        })
    }
}
