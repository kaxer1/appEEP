import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudiantesComponent } from './estudiantes.component';

const routes: Routes = [
  // { path: 'estudiantes', component: EstudiantesComponent, canActivate: [AuthGuard], data: { rol: 1 } },
  { path: '', component: EstudiantesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
