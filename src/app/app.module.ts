import { NgModule      } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule   } from '@angular/forms';
import { DndModule     } from 'ng2-dnd';

import { AppComponent     } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ContactsComponent      } from './contacts/contacts.component';
import { ContactListComponent   } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent   } from './contacts/contact-list/contact-item/contact-item.component';
import { ContactStartComponent  } from './contacts/contact-start/contact-start.component';
import { ContactEditComponent   } from './contacts/contact-edit/contact-edit.component';

import { DocumentsComponent      } from './documents/documents.component';
import { DocumentListComponent   } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentItemComponent   } from './documents/document-list/document-item/document-item.component';
import { DocumentStartComponent  } from './documents/document-start/document-start.component';
import { DocumentEditComponent   } from './documents/document-edit/document-edit.component';

import { HeaderComponent } from './header.component';

import { MessagesComponent    } from './messages/messages.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageItemComponent } from './messages/message-list/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';

import { DropdownDirective } from './dropdown.directive';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ContactsComponent,
        ContactListComponent,
        ContactDetailComponent,
        ContactStartComponent,
        ContactItemComponent,
        ContactEditComponent,
        DocumentsComponent,
        DocumentListComponent,
        DocumentDetailComponent,
        DocumentStartComponent,
        DocumentItemComponent,
        DocumentEditComponent,
        MessagesComponent,
        MessageListComponent,
        MessageItemComponent,
        MessageEditComponent,
        DropdownDirective,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        DndModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
