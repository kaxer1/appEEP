import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CedulaPipe, FullNamePipe, NombresPipe } from './nombres.pipe';
import { ActivoPipe } from './boolean.pipe';
import { ProcesosPipe } from './procesos.pipe';



@NgModule({
  declarations: [NombresPipe, ProcesosPipe, FullNamePipe, CedulaPipe, ActivoPipe],
  exports: [NombresPipe, ProcesosPipe, FullNamePipe, CedulaPipe, ActivoPipe],
  imports: [ CommonModule]
})
export class PipesModule { }
