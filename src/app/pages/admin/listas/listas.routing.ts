import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListasComponent } from './listas.component';

const routes: Routes = [
  { path: '', component: ListasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListasRoutingModule { }
