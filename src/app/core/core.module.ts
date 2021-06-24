import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CoreRoutingModule } from './core.routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { ContactComponent } from './pages/contacts/contact/contact.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TransferFormComponent } from './pages/transfers/transfer-form/transfer-form.component';
import { TransferComponent } from './pages/transfers/transfer/transfer.component';
import { TransfersComponent } from './pages/transfers/transfers.component';

@NgModule({
    declarations: [
        NavbarComponent,
        ContactsComponent,
        ContactComponent,
        ContactFormComponent,
        TransfersComponent,
        TransferComponent,
        TransferFormComponent
    ],
    imports: [
        MatToolbarModule,
        CoreRoutingModule,
        MatCardModule,
        CommonModule,
    ]
})

export class CoreModule { }
