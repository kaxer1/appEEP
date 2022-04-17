import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OpcionesMenuRoutingModule } from './opcionesmenu.routing';
import { OpcionesMenuComponent } from './opcionesmenu.component';

import { FormsAplicacionModule } from '../../../../components/forms/forms-aplicacion.module';
import { AccionesBtnModule } from '../../../../components/buttons/acciones-btn.module';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { DialogsModule } from '../../../../components/dialogs/dialogs.module';
import { MaterialModule } from '../../../../material/material.module';

@NgModule({
  declarations: [
    OpcionesMenuComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    OpcionesMenuRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsAplicacionModule,
    AccionesBtnModule,
    DialogsModule
  ]
})
export class OpcionesMenuModule { }
