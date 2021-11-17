import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core.routing.module';

@NgModule({
    imports: [
        CoreRoutingModule,
        CommonModule,
        SharedModule,
        MatToolbarModule,
    ],
})

export class CoreModule { }
