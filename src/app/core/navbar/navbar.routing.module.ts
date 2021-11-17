import { NgModule } from '@angular/core';
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
