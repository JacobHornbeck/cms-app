import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
    selector: 'cms-document-detail',
    templateUrl: './document-detail.component.html',
    styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    document: Document;
    nativeWindow: any;
    id: string;

    constructor(private documentService: DocumentService,
                private route: ActivatedRoute,
                private windowRefService: WindRefService,
                private router: Router) {
        this.nativeWindow = windowRefService.getNativeWindow();
    }
    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id']
            this.documentService.getDocument(this.id)
                .subscribe((result: { message: string, document: Document }) => {
                    this.document = result.document
                })
        })
        this.subscription = this.documentService.documentUpdated.subscribe((document: Document) => {
            this.document = document
        })
    }

    onView() {
        if (this.document.url)
            this.nativeWindow.open(this.document.url);
    }
    onDelete() {
        this.documentService.deleteDocument(this.document)
        this.router.navigate(['/documents'])
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
