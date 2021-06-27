import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthPageGuard } from './auth/auth-page.guard';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Route[] = [
    { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [AuthPageGuard], 
    },
    { 
        path: 'signup', 
        component: SignupComponent,
        canActivate: [AuthPageGuard], 
    },
    // { path: '', redirectTo: 'login', pathMatch: 'full'},
    { 
        path: '**', 
        redirectTo: 'login', 
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ],
})

export class AppRoutingModule {

}