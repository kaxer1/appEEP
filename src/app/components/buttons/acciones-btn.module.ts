import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogEliminar, EliminarComponent } from './eliminar/eliminar.component';
import { EditarComponent } from './editar/editar.component';
import { GuardarComponent } from './guardar/guardar.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [EliminarComponent, EditarComponent, GuardarComponent, DialogEliminar],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [EliminarComponent, EditarComponent, GuardarComponent]
})
export class AccionesBtnModule { }
