import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { ContactComponent } from './pages/contacts/contact/contact.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TransferFormComponent } from './pages/transfers/transfer-form/transfer-form.component';
import { TransferComponent } from './pages/transfers/transfer/transfer.component';
import { TransfersComponent } from './pages/transfers/transfers.component';
import { ContactViewComponent } from './pages/contacts/contact-view/contact-view.component';


@NgModule({
    declarations: [
        NavbarComponent,
        ContactsComponent,
        ContactComponent,
        ContactFormComponent,
        ContactViewComponent,
        TransfersComponent,
        TransferComponent,
        TransferFormComponent,
    ],
    imports: [
        CoreRoutingModule,
        CommonModule,
        SharedModule,
        FormsModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
    ]
})

export class CoreModule { }
