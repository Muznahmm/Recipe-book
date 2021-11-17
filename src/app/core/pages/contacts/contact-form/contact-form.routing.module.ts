import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { CanDeactivateForm } from 'src/app/utils/guards/can-deactivate-form.guard';
import { ContactFormComponent } from './contact-form.component';

const routes: Route[] = [
    {
        path: '',
        component: ContactFormComponent,
        canDeactivate: [ CanDeactivateForm ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ContactFormRoutingModule { }