import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ContactViewComponent } from './contact-view.component';

const routes: Route[] = [
    {
        path: '',
        component: ContactViewComponent,
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})

export class ContactViewRoutingModule {

}