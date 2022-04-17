import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { ButtonsMenuComponent } from './buttonsMenu/buttons-menu.component';
import { InfoUserComponent } from './info-user/info-user.component';
import { LoadingComponent } from '../components/loading/loading.component';

@NgModule({
  exports: [
    FooterComponent,
    NavComponent,
    MenuLateralComponent,
    ButtonsMenuComponent,
    InfoUserComponent
  ],
  declarations: [
    FooterComponent,
    NavComponent,
    MenuLateralComponent,
    ButtonsMenuComponent,
    InfoUserComponent,
    InfoUserComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedModule { }
