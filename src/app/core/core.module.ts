import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { ContactComponent } from './pages/contacts/contact/contact.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ContactViewComponent } from './pages/contacts/contact-view/contact-view.component';

import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionComponent } from './pages/transactions/transaction/transaction.component';
import { SettingsComponent } from './pages/settings/settings.component';


@NgModule({
    declarations: [
        NavbarComponent,
        ContactsComponent,
        ContactComponent,
        ContactFormComponent,
        ContactViewComponent,
        TransactionsComponent,
        TransactionComponent,
        SettingsComponent,
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
        MatIconModule,
        MatMenuModule,
    ]
})

export class CoreModule { }
