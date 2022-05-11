import { Component, OnInit } from '@angular/core';
import { Document } from './documents.model';

@Component({
    selector: 'cms-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
    documentSelected: Document;

    constructor() { }
    ngOnInit(): void { }
}
