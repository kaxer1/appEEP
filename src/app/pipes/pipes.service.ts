import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PipesService {

  public nombre = new FormControl('', [Validators.minLength(2)]);
  public fiNom = '';

  public cedula = new FormControl('', [Validators.minLength(2)]);
  public fiCed = '';
  
  public fiAct: boolean = null;

  constructor() { }

  resetpipes() {
    this.resetformsControls();
    this.resetFiltros();
  }
  
  private resetformsControls() {
    this.nombre.reset();
    this.cedula.reset();
  }

  private resetFiltros() {
    this.fiNom = '';
    this.fiCed = '';
    this.fiAct = null;
  }

  filtroBDS(dataSource, filtroname):void {
    dataSource.filter = filtroname.toLowerCase();
    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }

  filtroBDSBoolean(dataSource, filtroname):void {
    dataSource.filter = filtroname;
    if (dataSource.paginator) {
      dataSource.paginator.firstPage();
    }
  }
}
