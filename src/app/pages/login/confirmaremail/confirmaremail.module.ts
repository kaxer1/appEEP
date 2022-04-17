import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmarEmailRoutingModule } from './confirmaremail.routing';

import { MaterialModule } from '../../../material/material.module';

import { ConfirmarEmailComponent } from './confirmaremail.component';

@NgModule({
  declarations: [ConfirmarEmailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmarEmailRoutingModule,
    MaterialModule
  ],
  exports: [ConfirmarEmailComponent]
})
export class ConfirmarEmailModule { }
