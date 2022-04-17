import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CandidatosRoutingModule } from './candidatos.routing';
import { CandidatosComponent } from './candidatos.component';

import { MaterialModule } from 'src/app/material/material.module';
import { FormsAplicacionModule } from '../../../components/forms/forms-aplicacion.module';
import { AccionesBtnModule } from '../../../components/buttons/acciones-btn.module';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { DialogsModule } from '../../../components/dialogs/dialogs.module';

@NgModule({
  declarations: [
    CandidatosComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    CandidatosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsAplicacionModule,
    AccionesBtnModule,
    DialogsModule
  ]
})
export class CandidatosModule { }
