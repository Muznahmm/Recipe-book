import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    declarations: [
        NavbarComponent,
    ],
    imports: [
        MatToolbarModule,
    ]
})

export class CoreModule { }
