import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecuperarPasswordRoutingModule } from './recuperarpassword.routing';

import { MaterialModule } from '../../../material/material.module';

import { RecuperarPasswordComponent } from './recuperarpassword.component';

@NgModule({
  declarations: [RecuperarPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecuperarPasswordRoutingModule,
    MaterialModule
  ],
  exports: [RecuperarPasswordComponent]
})
export class RecuperarPasswordModule { }
