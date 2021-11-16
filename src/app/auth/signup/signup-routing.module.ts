import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';

const routes: Route[] = [
    {
        path: '',
        component: SignupComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})

export class SingupRoutingModule { }
