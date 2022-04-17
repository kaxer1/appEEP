import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmarEmailComponent } from './confirmaremail.component';

const routes: Routes = [
  {
    path: '', 
    component: ConfirmarEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmarEmailRoutingModule { }
