import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';
import { AuthPageGuard } from './auth/auth-page.guard';
import { CorePageGuard } from './core/core-page.guard';

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
    { 
        path: '', 
        loadChildren: async() => {
            const m = await import('./core/navbar/navbar.module');
            return m.NavbarModule;
        },
        canActivate: [CorePageGuard],
    },
    { 
        path: '**', 
        redirectTo: 'login', 
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            // Added to load one page to avoid lazy loading disadvantage
            // preloadingStrategy: PreloadAllModules
        }),
    ],
    exports: [
        RouterModule,
    ],
})

export class AppRoutingModule {

}