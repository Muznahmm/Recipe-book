import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { ContactsComponent } from './contacts.component';

const routes: Route[] = [
    {
        path: '',
        component: ContactsComponent,
    },
    // {
    //     path: 'contact/:id',
    //     loadChildren: () => import('./contact-view/contact-view.module')
    //     .then(m => m.ContactViewModule),

    // },
    // { 
    //     path: 'new-contact', 
    //     loadChildren: () => import('./contact-form/contact-form.module')
    //     .then(m => m.ContactFormModule),
    // },
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
})

export class ContactsRoutingModule { }
