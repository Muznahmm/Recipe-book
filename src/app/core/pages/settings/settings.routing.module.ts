import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Route[] = [
    {
        path: '',
        component: SettingsComponent,
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ],
})

export class SettingsRoutingModule { }
