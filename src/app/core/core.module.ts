import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { ContactComponent } from './pages/contacts/contact/contact.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ContactViewComponent } from './pages/contacts/contact-view/contact-view.component';

import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionComponent } from './pages/transactions/transaction/transaction.component';
import { TransactionFormComponent } from './pages/transactions/transaction-form/transaction-form.component';
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
        TransactionFormComponent,
        SettingsComponent,
    ],
    imports: [
        CoreRoutingModule,
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
    ],
})

export class CoreModule { }
