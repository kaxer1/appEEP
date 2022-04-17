import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProcesoService } from '../../../../services/proceso.service';
import { DataCentralService } from '../../../../libs/data-central.service';

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
    private procesoService: ProcesoService,
    private dcentral: DataCentralService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      id: ['', [Validators.required]],
      descripcion: ['', [Validators.maxLength(255)]],
      estado: [false],
      semestre: ['', [Validators.maxLength(255)]],
      fec_eleccion: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_final: ['', [Validators.required]]      
    });
    this.SetData();
  }

  SetData() {
    this.grupoFormulario.setValue({
      id: this.data.id,
      descripcion: this.data.descripcion,
      estado: this.data.estado,
      semestre: this.data.semestre,
      fec_eleccion: this.data.fec_eleccion,
      hora_inicio: this.data.hora_inicio,
      hora_final: this.data.hora_final
    })
  }

  Guardar(form) {
    this.procesoService.PutProcesoElectoral(form).subscribe(res => {
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
      descripcion: '',
      estado: false,
      semestre: this.data.semestre,
      fec_eleccion: '',
      hora_inicio: '',
      hora_final: ''
    })
  }

  /** Método para validar el ingreso de letras */
  IngresarSoloLetras(e) {
    return this.dcentral.IngresarSoloLetras(e)
  }

  /** Método para validar el ingreso de números */
  IngresarSoloNumeros(evt) {
    return this.dcentral.IngresarSoloNumeros(evt)
  }

}
