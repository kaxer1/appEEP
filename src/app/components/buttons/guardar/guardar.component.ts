import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { permisosSistema } from '../../../interfaces/user.iterface';
import { DataCentralService } from '../../../libs/data-central.service';

@Component({
  selector: 'btn-crear',
  templateUrl: './guardar.component.html'
})
export class GuardarComponent implements OnInit {

  @Input() isButtom: boolean = true;
  @Output() onRegistro: EventEmitter<any> = new EventEmitter()

  @Input() label: string = 'Crear';

  public get permisos() : permisosSistema {
    return this.dcentral.permisos
  }
  
  constructor(
    private dcentral: DataCentralService
  ) { }

  ngOnInit(): void {
  }

  openDialog() { // solo dispara el evento para que se habra en el componente q se utiliza el formulario de Registro
    if (this.permisos.crear === false) return this.dcentral.mostrarmsgerror('Usuario no tiene permiso para registrar');
    
    this.onRegistro.emit()
  }

}
