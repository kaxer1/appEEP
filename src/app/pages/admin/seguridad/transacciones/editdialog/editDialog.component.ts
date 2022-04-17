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
      ruta: ['', [Validators.required, Validators.maxLength(100),]],
      path: ['', [Validators.required, Validators.maxLength(255)]]
    });
    this.SetData();
  }

  SetData() {
    this.grupoFormulario.setValue({
      ruta: this.data.ruta,
      path: this.data.path,
    })
  }

  Guardar(form) {
    this.segService.MantenimientoTransaccion(form, 1).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      ruta: this.data.ruta,
      path: '',
    })
  }

}
