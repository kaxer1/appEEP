import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EstudiantesRoutingModule } from './estudiantes.routing';
import { EstudiantesComponent } from './estudiantes.component';

import { MaterialModule } from 'src/app/material/material.module';
import { FormsAplicacionModule } from '../../../components/forms/forms-aplicacion.module';
import { AccionesBtnModule } from '../../../components/buttons/acciones-btn.module';
import { PipesModule } from '../../../pipes/pipes.module';


@NgModule({
  declarations: [
    EstudiantesComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AccionesBtnModule,
    FormsAplicacionModule,
    PipesModule
  ]
})
export class EstudiantesModule { }
