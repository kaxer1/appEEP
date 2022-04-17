import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-registrar-dialog',
  templateUrl: './registrarDialog.component.html',
  styleUrls: ['./registrarDialog.component.sass']
})
export class RegistrarDialogComponent implements OnInit {

  // variables formulario
  nombre_listaCtrl = new FormControl('', [Validators.required]);
  descripcionCtrl = new FormControl('', [Validators.required]);

  registrarListaForm: FormGroup

  //imagen
  logo: any;
  imagen_default: boolean = false;

  constructor(
    private listaService: ListaService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RegistrarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.registrarListaForm = this.formBuilder.group({
      image: [''],
      nombre_lista: this.nombre_listaCtrl,
      descripcion: this.descripcionCtrl,
      estado: true,
      id_proceso: this.data.id_proceso
    })
  }

  GuardarLista(form) {
    let data = {
      nom_lista: form.nombre_lista,
      descripcion: form.descripcion,
      estado: form.estado,
      id_proceso: form.id_proceso
    }

    const formData = new FormData();
    formData.append('image', this.registrarListaForm.get('image').value);

    this.listaService.RegistrarLista(data).subscribe(res => {
      
      if (res.id !== null && form.imagen !== "" && res.cod == 'OK') {
        
        this.listaService.SubirImagen(formData, res.id).subscribe(response => {
          
          this.LimpiarCampos()
          this.dialogRef.close(true);
        });
        
      }

    })
  }

  LimpiarCampos() {
    this.registrarListaForm.reset();
  }

  /* 
  ****************************************************************************************************
  *                               PARA LA SUBIR LA IMAGEN DEL EMPLEADO
  ****************************************************************************************************
  */

  async fileChange(element) {
    if (element.target.files.length > 0) {
      const file = element.target.files[0];
      this.registrarListaForm.get('image').setValue(file);

      this.logo = await this.getBase64(file).then(
        data => { return data }
      ) || '';

      this.imagen_default = true
    }
  }

  async getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
