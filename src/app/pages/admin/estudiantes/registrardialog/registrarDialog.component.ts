import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SHA256 } from 'crypto-js';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registrar-dialog',
  templateUrl: './registrarDialog.component.html',
  styles: [`
    mat-form-field {
      margin: 0px 10px;
    }
    .checked {
      display: flex;
      align-content: left;
      align-items: left;
      width: 30%
    }
  `]
})
export class RegistrarDialogComponent implements OnInit {

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

  lroles: any[] = [];

  hiddenpassword = true;

  constructor(
    private userService: UserService,
    private segService: SeguridadService,
    public dialogRef: MatDialogRef<RegistrarDialogComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      cedula: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      email: ['', [Validators.maxLength(200)]],
      activo: [true, [Validators.required]],
      rol: [null, [Validators.required]],
      sufrago: [false],
      estudiante: [false]
    });
    this.ObtenerTipoCatalogo();
  }

  Guardar(form) {
    form.nombre = form.nombre.toUpperCase();
    form.apellido = form.apellido.toUpperCase();
    form.password = SHA256(form.password).toString();
    this.userService.RegistrarEstudiante(form).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
  }

  ObtenerTipoCatalogo() {
    this.segService.ListarRol().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.lroles = resp.rol;
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      username: '',
      nombre: '',
      apellido: '',
      cedula: '',
      password: '',
      email: '',
      activo: null,
      rol: null,
      sufrago: false,
      estudiante: null
    })
  }

}