import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpcionesMenuComponent } from './opcionesmenu.component';

const routes: Routes = [
  { path: '', component: OpcionesMenuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpcionesMenuRoutingModule { }
