import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataCentralService } from './libs/data-central.service';
import { LoginService } from './services/login/login.service';
import { User } from './interfaces/user.iterface';
import { Menu } from './interfaces/menu.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'appEEP';
  public url = '';

  public get muser(): User {
    return this.dcentral.user
  }

  public get mmenu(): Menu[] {
    return this.dcentral.menu
  }

  public get login(): boolean {
    return this.loginService.login;
  }

  constructor(
    public location: Location,
    private loginService: LoginService,
    private dcentral: DataCentralService
  ) { }

  ngOnInit() {
    this.loginService.setlogin(false);
    this.url = this.location.path();
    if ((localStorage.getItem('d') !== undefined && localStorage.getItem('d') !== null) || this.dcentral.validarToken()) {
      this.loginService.setlogin(true);
      this.ejecutarPermisos();
    }
  }

  async ejecutarPermisos() {
    try {
      this.dcentral.desencriptarDataUser();
      await this.dcentral.ConsultarMenu().subscribe(resp => {
        this.dcentral.setMenuRol(resp.menu);
      });
    } catch (error) { }

    if (this.muser == null || this.muser === undefined) {
      return;
    }
    this.iniciarAmbiente(this.muser);

  }

  iniciarAmbiente(user: User) {
    console.log(user);
    console.log(this.mmenu);
  }

  validarUrl(url: string): string {
    const valida = url.includes("?token");
    let value = '/';
    if (valida) {
      value = url.split("?token")[0];
    } else {
      value = url;
    }
    return value;
  }

}
