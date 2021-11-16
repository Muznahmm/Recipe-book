import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { TransactionsComponent } from './transactions.component';

const routes: Route[] = [
    {
        path: '',
        component: TransactionsComponent,
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
})

export class TransactionsRoutingMmodule { }
