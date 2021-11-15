import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
    {
        path: '',
        loadChildren: () => import('./login.module').then(m => m.LoginModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})

export class LoginRoutingModule { }
