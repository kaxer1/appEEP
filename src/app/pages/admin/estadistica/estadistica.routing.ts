import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstadisticaComponent } from './estadistica.component';

const routes: Routes = [
  // { path: 'votos-live', component: EstadisticaComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: '', component: EstadisticaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadisticaRoutingModule { }
