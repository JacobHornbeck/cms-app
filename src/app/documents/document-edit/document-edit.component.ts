import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DocumentService } from '../document.service';
import { Document } from "../document.model";

@Component({
    selector: 'cms-document-edit',
    templateUrl: './document-edit.component.html',
    styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
    @ViewChild('f') docForm: NgForm;
    document: Document;
    originalDocument: Document;
    subscription: Subscription;
    editMode: Boolean = false;
    id: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private documentService: DocumentService) {}
    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id']
            this.editMode = params['id'] != null;
            if (this.id) {
                this.documentService.getDocument(this.id)
                    .subscribe((result: { message: string, document: Document }) => {
                        this.document = result.document
                    })
            }
        })
    }

    onSubmit(form: NgForm) {
        if (this.editMode) this.documentService.updateDocument(this.document, form.value);
        else this.documentService.addDocument(form.value);
        this.onCancel();
    }

    onCancel() {
        if (this.editMode) this.router.navigate(['/documents', this.id]);
        else this.router.navigate(['/documents'])
    }
}
