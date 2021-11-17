import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CanDeactivateForm } from 'src/app/utils/guards/form-alert/can-form-deactivate.guard';
import { SignupComponent } from './signup.component';

const routes: Route[] = [
    {
        path: '',
        component: SignupComponent,
        canDeactivate: [CanDeactivateForm],
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
