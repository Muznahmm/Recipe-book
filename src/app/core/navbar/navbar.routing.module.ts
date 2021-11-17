import { NgModule } from '@angular/core';
import { async } from '@angular/core/testing';
import { Route, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

const routes: Route[] = [
    {
        path: '',
        component: NavbarComponent,
        children: [
            {
                path: 'contacts',
                loadChildren: async () => {
                    const m = await import('./../pages/contacts/contacts.module');
                    return m.ContactsModule;
                },
            },
            {
                path: 'contact/:id',
                loadChildren: async () => {
                    const m = await import('./../pages/contacts/contact-view/contact-view.module');
                    return  m.ContactViewModule;
                }

            },
            { 
                path: 'new-contact', 
                loadChildren: () => import('./../pages/contacts/contact-form/contact-form.module')
                .then(m => m.ContactFormModule),
            },
            { 
                path: 'edit-contact/:id', 
                loadChildren: () => import('./../pages/contacts//contact-form/contact-form.module')
                .then(m => m.ContactFormModule),
            },
            {
                path: 'contact',
                loadChildren: async () => {
                    const m = await import('./../pages/contacts/contact/contact.module');
                    return  m.ContactModule;
                }

            },
            {
                path: 'transactions',
                loadChildren: async () => {
                    const m = await import('./../pages/transactions/transactions.module');
                    return m.TransactionsModule;
                },
            },
            {
                path: 'settings',
                loadChildren: async () => {
                    const m = await import('./../pages/settings/settings.module');
                    return m.SettingsModule;
                },
            },
            { 
                path: '',
                redirectTo: 'contacts',
                pathMatch: 'full'
            },
        ],
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
})

export class NavbarRoutingModule { }
