import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TransferComponent } from './pages/transfers/transfer/transfer.component';

const routes: Routes = [
    { path: 'home', component: NavbarComponent,
        children: [
            { path: 'contacts', component: ContactsComponent },
            { path: 'transfers', component: TransferComponent },
        ] 
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})

export class CoreRoutingModule { }