import { Component, Input } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-buttons-menu',
  templateUrl: './buttons-menu.component.html',
  styles: [`
    #iconos-navegador {
      color: rgb(232, 238, 243)
    }
  `]
})
export class ButtonsMenuComponent {

  @Input() showBtn: boolean = false;

  constructor(
    public loginService: LoginService,
  ) { }

}
