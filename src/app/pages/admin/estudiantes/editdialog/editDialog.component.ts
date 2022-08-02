import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { UserService } from 'src/app/services/user.service';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './editDialog.component.html',
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
export class EditDialogComponent implements OnInit {

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

  lroles: any[] = [];

  hiddenpassword = true;

  constructor(
    private userService: UserService,
    private segService: SeguridadService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      id: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      cedula: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
      password: ['', [Validators.maxLength(50)]],
      email: ['', [Validators.maxLength(200)]],
      activo: [true],
      rol: [null],
      sufrago: [false],
      estudiante: [false]
    });
    this.ObtenerTipoCatalogo();
    this.SetData();
  }

  SetData() {
    this.grupoFormulario.setValue({
      id: this.data.id,
      username: this.data.username,
      nombre: this.data.nombre,
      apellido: this.data.apellido,
      cedula: this.data.cedula,
      password: '',
      email: this.data.email,
      activo: this.data.activo,
      rol: this.data.rol,
      sufrago: this.data.sufrago,
      estudiante: this.data.estudiante
    })
  }

  Guardar(form) {
    form.nombre = form.nombre.toUpperCase();
    form.apellido = form.apellido.toUpperCase();
    if (form.password == '') {
      delete form.password;
    } else {
      form.password = SHA256(form.password).toString(); 
    }

    this.userService.ActualizarEstudiante(form).subscribe(res => {
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
      id: this.data.id,
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
