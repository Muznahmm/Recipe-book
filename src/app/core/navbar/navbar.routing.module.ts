import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

const routes: Route[] = [
    {
        path: '',
        component: NavbarComponent,
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
})

export class NavbarRoutingModule { }
