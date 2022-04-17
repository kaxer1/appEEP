import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeguridadService } from '../../../../../services/seguridad.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './editDialog.component.html',
  styles: [
  ]
})
export class EditDialogComponent implements OnInit {

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

  constructor(
    private segService: SeguridadService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      vota: [false],
      tiemposesion: ['', [Validators.required, Validators.maxLength(100)]]
    });
    this.SetData();
  }

  SetData() {
    this.grupoFormulario.setValue({
      id: this.data.id,
      nombre: this.data.nombre,
      vota: this.data.vota,
      tiemposesion: this.data.tiemposesion,
    })
  }

  Guardar(form) {
    form.nombre = form.nombre.toUpperCase();
    this.segService.MantenimientoRol(form, 1).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      id: this.data.id,
      nombre: '',
      vota: false,
    })
  }

}
