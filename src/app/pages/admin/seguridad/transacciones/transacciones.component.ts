import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DataCentralService } from '../../../../libs/data-central.service';
import { PipesService } from '../../../../pipes/pipes.service';
import { EditDialogComponent } from './editdialog/editDialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeguridadService } from '../../../../services/seguridad.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.html',
  styleUrls: ['../../../stylesTables.css']
})
export class TransaccionesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: any;
  lregistros: any[] = [];

  /**
   * Varibles formulario
   */
  public grupoFormulario: FormGroup;

  // ITEMS DE PAGINACIÓN DE LA TABLA
  displayedColumns: string[] = ['ruta', 'path', 'acciones'];
  pageSizeOptions = [5, 10, 20, 50];
  tamanio_pagina: number = 5;
  numero_pagina: number = 1;

  constructor(private segService: SeguridadService, private dcentral: DataCentralService, public pipe: PipesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.grupoFormulario = this.fb.group({
      ruta: ['', [Validators.required, Validators.maxLength(100)]],
      path: ['', [Validators.required, Validators.maxLength(255)]]
    });

    this.ObtenerListaTransaccion();
  }
  
  ObtenerListaTransaccion() {
    this.segService.ListarTransaccion().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.dataSource = this.dcentral.llenarVariablesTabla(resp.transacciones, this.paginator);
      this.lregistros = this.dataSource.data;
    })
  }

  ManejarPagina(e: PageEvent) {
    this.numero_pagina = e.pageIndex + 1;
    this.tamanio_pagina = e.pageSize;
  }

  abirDialgo(registro: any) {
    this.dcentral.dialog.open(EditDialogComponent, { width: '400px', data: registro})
      .afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerListaTransaccion()
        }
      })
  }

  Guardar(form) {
    this.segService.MantenimientoTransaccion(form).subscribe(res => {
      if (res.cod === "ERROR") {
        return;
      }
      this.ObtenerListaTransaccion();
      this.LimpiarCampos();
    })
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
  }

  /** Método para validar el ingreso de letras */
  soloLetras(e) {
    return this.dcentral.IngresarSoloLetras(e)
  }

  /** Método para validar el ingreso de números */
  soloNumeros(evt) {
    return this.dcentral.IngresarSoloNumeros(evt)
  }

  activeCheck(e) {
    this.pipe.fiAct = e.checked;
    this.pipe.filtroBDSBoolean(this.dataSource, this.pipe.fiAct)
  }

}