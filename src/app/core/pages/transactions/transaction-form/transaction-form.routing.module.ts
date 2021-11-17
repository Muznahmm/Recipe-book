import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { TransactionFormComponent } from './transaction-form.component';


const routes: Route[] = [
    {
        path: '',
        component: TransactionFormComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
})

export class TransactionFormRoutingMmodule { }
