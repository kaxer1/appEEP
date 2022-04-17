import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-confirmar-email',
  templateUrl: './confirmaremail.component.html',
  styleUrls: ['../login.component.sass']
})
export class ConfirmarEmailComponent implements OnInit {

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  Guardar(form) {
    this.loginService.postSendEmail(form).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.LimpiarCampos();
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
  }

}
