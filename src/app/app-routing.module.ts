import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthPageGuard } from './auth/auth-page.guard';

const routes: Route[] = [
    { 
        path: 'login', 
        loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
        canActivate: [AuthPageGuard], 
    },
    { 
        path: 'signup', 
        loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule),
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