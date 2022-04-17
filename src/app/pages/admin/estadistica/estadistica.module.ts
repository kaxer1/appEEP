import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticaRoutingModule } from './estadistica.routing';
import { EstadisticaComponent } from './estadistica.component';

import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    EstadisticaComponent
  ],
  imports: [
    CommonModule,
    EstadisticaRoutingModule,
    MaterialModule
  ]
})
export class EstadisticaModule { }
