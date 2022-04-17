import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { permisosSistema } from '../../../interfaces/user.iterface';
import { DataCentralService } from '../../../libs/data-central.service';

@Component({
  selector: 'btn-editar',
  templateUrl: './editar.component.html'
})
export class EditarComponent implements OnInit {

  @Input() isButtom: boolean = true;
  @Input() registro: any;
  @Output() onEdit: EventEmitter<any> = new EventEmitter()

  @Input() label: string = 'Editar';

  public get permisos() : permisosSistema {
    return this.dcentral.permisos
  }
  
  constructor(
    private dcentral: DataCentralService
  ) { }

  ngOnInit(): void {
  }

  openDialog() { // solo dispara el evento para que se habra en el componente q se utiliza el formulario de Edicion
    if (this.permisos.editar === false) return this.dcentral.mostrarmsgerror('Usuario no tiene permiso para editar registro');
    
    this.onEdit.emit(this.registro)
  }

}
