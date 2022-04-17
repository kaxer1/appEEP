import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataCentralService } from '../../../libs/data-central.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { permisosSistema } from '../../../interfaces/user.iterface';

@Component({
  selector: 'btn-eliminar',
  templateUrl: './eliminar.component.html'
})
export class EliminarComponent {

  @Input() isButtom: boolean = true;

  @Input() label: string = 'Eliminar';

  @Input() nameTable: string = '';
  @Input() idreg: string = '';

  @Input() pkatributo: string = 'id';

  @Output() onDelete: EventEmitter<any> = new EventEmitter()

  public get permisos() : permisosSistema {
    return this.dcentral.permisos
  }
  
  constructor(
    private dcentral: DataCentralService,
  ) { }

  openDialog() { // abre el dialog general para eliminar cualquier registro.
    if (this.permisos.elminar === false) return this.dcentral.mostrarmsgerror('Usuario no tiene permiso para eliminar registro');

    if (this.nameTable === '' && this.idreg === '') return this.dcentral.mostrarmsgerror('Código de registro no encontrado para eliminar');

    this.dcentral.dialog.open(DialogEliminar).afterClosed().subscribe(eliminar=> {
      if (eliminar == true) {
        this.dcentral.EliminarRegistro(this.idreg, this.nameTable, this.pkatributo).subscribe(
          data => { },
          err => { },
          () => { this.onDelete.emit() }
        )
      }
    })
  }

}

/**
 * @title Dialog elements
 */
 @Component({
  selector: 'dialog-elminar',
  template: `
    <h2 style="text-align: center;" mat-dialog-title>⚠ Alerta!</h2>
    <div style="text-align: center;" mat-dialog-content>Seguro en eliminar este registro.</div> 
    <br>
    <div mat-dialog-actions class="d-flex justify-align-center">
      <button mat-button class="btn btn-primary mx-3" (click)="dialogRef.close(true)">Confirmar</button>
      <button mat-button class="btn btn-danger mx-3" (click)="dialogRef.close(false)">Salir</button>
    </div>
  `,
})
export class DialogEliminar {
  constructor(
    public dialogRef: MatDialogRef<DialogEliminar>
  ) {  }

}
