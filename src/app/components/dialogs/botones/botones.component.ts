import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { permisosSistema } from '../../../interfaces/user.iterface';
import { DataCentralService } from '../../../libs/data-central.service';

@Component({
  selector: 'app-dialog-botones',
  templateUrl: './botones.component.html',
})
export class BotonesComponent implements OnInit {

  @Input() formulario: FormGroup;
  @Input() tipoAccion: string = 'crear'; // 'crear' o 'editar'
  
  @Output() onGuardar: EventEmitter<any> = new EventEmitter();
  @Output() onCancelar: EventEmitter<any> = new EventEmitter();

  public get permisos() : permisosSistema {
    return this.dcentral.permisos
  }
  
  constructor(
    private dcentral: DataCentralService
  ) { }

  ngOnInit(): void {
  }

  Guardar(form: any) {
    if (this.permisos[this.tipoAccion] === false) return this.dcentral.mostrarmsgerror(`Usuario no tiene permiso para ${(this.tipoAccion == 'crear') ? 'registrar' : 'editar'}`);

    this.onGuardar.emit(form);
  }
  
  Cancelar() {
    this.onCancelar.emit();
  }

}
