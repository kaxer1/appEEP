import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecuperarPasswordComponent } from './recuperarpassword.component';

const routes: Routes = [
  {
    path: '', 
    component: RecuperarPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperarPasswordRoutingModule { }
