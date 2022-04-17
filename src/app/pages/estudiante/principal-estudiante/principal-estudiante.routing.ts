import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalEstudianteComponent } from './principal-estudiante.component';

const routes: Routes = [
  // { path: 'home-estudiante', component: PrincipalEstudianteComponent, canActivate: [AuthGuard], data: { rol: 2 } },
  { path: '', component: PrincipalEstudianteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalEstudianteRoutingModule { }
