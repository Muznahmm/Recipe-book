import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ContactFormComponent } from './contact-form.component';

const routes: Route[] = [
    {
        path: '',
        component: ContactFormComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ContactFormRoutingModule { }