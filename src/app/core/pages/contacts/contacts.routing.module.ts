import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ContactsComponent } from './contacts.component';

const routes: Route[] = [
    {
        path: '',
        component: ContactsComponent,
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
})

export class ContactsRoutingModule { }
