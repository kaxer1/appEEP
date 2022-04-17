import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { ProcesoElectoralRoutingModule } from './proceso-electoral.routing';
import { ProcesoElectoralComponent } from './proceso-electoral.component';

import { FormsAplicacionModule } from '../../../components/forms/forms-aplicacion.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { DialogsModule } from 'src/app/components/dialogs/dialogs.module';
import { AccionesBtnModule } from 'src/app/components/buttons/acciones-btn.module';

@NgModule({
  declarations: [
    ProcesoElectoralComponent,
    EditDialogComponent
  ],
  imports: [
    CommonModule,
    ProcesoElectoralRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsAplicacionModule,
    PipesModule,
    AccionesBtnModule,
    DialogsModule
  ]
})
export class ProcesoElectoralModule { }
