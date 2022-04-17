import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcesoElectoralComponent } from './proceso-electoral.component';

const routes: Routes = [
  // { path: 'proceso-electoral', component: ProcesoElectoralComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: '', component: ProcesoElectoralComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesoElectoralRoutingModule { }
