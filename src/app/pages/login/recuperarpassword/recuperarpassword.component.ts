import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
import { SHA256 } from 'crypto-js';
import { ActivatedRoute } from '@angular/router';
import { DataCentralService } from '../../../libs/data-central.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperarpassword.component.html',
  styleUrls: ['../login.component.sass']
})
export class RecuperarPasswordComponent implements OnInit {

  hiddenpassword = true;

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

    constructor(private loginService: LoginService, private fb: FormBuilder, private route: ActivatedRoute, private dcentral: DataCentralService) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      newpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
    });

    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      localStorage.setItem('tokenRecuperacion', token);
    });
  }

  Guardar(form) {
    form.newpassword = SHA256( form.newpassword ).toString();
    form.confirmpassword = SHA256( form.confirmpassword ).toString();

    if (form.newpassword != form.confirmpassword) {
      return this.dcentral.mostrarmsgerror('Las contraseñas no coinciden');
    }

    this.loginService.postSendPassword(form).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.loginService.logout();
      this.LimpiarCampos();
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
  }

}
