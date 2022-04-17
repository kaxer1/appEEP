import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatosComponent } from './candidatos.component';

const routes: Routes = [
  // { path: 'candidatos/:id_lista', component: CandidatosComponent },
  { path: '', component: CandidatosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatosRoutingModule { }
