import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';

import { BotonesComponent } from './botones/botones.component';
import { TituloComponent } from './titulo/titulo.component';


@NgModule({
  declarations: [BotonesComponent, TituloComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [BotonesComponent, TituloComponent]
})
export class DialogsModule { }
