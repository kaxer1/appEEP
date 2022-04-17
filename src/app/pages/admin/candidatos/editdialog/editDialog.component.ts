import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CandidaturaService } from '../../../../services/candidatura.service';

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
   nombreCtrl = new FormControl('', Validators.required)
   apellidoCtrl = new FormControl('', Validators.required)
   cargoCtrl = new FormControl('', Validators.required)
 
   public CandidatosForm = new FormGroup({
     nombre: this.nombreCtrl,
     apellido: this.apellidoCtrl,
     cargo: this.cargoCtrl
   });

  constructor(
    private candidaturaService: CandidaturaService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.CandidatosForm.setValue({
      nombre: this.data.nombre,
      apellido: this.data.apellido,
      cargo: this.data.cargo,
    })
  }

  Guardar(form) {
    let data = {
      id: this.data.id,
      nombre: form.nombre,
      apellido: form.apellido,
      cargo: form.cargo,
      id_lista: this.data.id_lista
    }
    this.candidaturaService.EditarCandidato(data).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.dialogRef.close(true);
    })
  }

  LimpiarCampos() {
    this.CandidatosForm.reset();
  }

}
