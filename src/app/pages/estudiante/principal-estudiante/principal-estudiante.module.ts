import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { PrincipalEstudianteRoutingModule } from './principal-estudiante.routing';
import { PrincipalEstudianteComponent } from './principal-estudiante.component';

@NgModule({
  declarations: [
    PrincipalEstudianteComponent,
  ],
  imports: [
    CommonModule,
    PrincipalEstudianteRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class PrincipalEstudianteModule { }
