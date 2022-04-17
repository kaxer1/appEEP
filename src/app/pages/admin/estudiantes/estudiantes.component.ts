import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DataCentralService } from '../../../libs/data-central.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PipesService } from '../../../pipes/pipes.service';


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['../../stylesTables.css']
})
export class EstudiantesComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: any;
  lregistros: any[] = [];

  // ITEMS DE PAGINACIÓN DE LA TABLA
  displayedColumns: string[] = ['id', 'fullname', 'cedula', 'email', 'activo', 'acciones'];
  pageSizeOptions = [5, 10, 20, 50];
  tamanio_pagina: number = 5;
  numero_pagina: number = 1;
  
  constructor(private estudianteService: UserService, private dcentral: DataCentralService, public pipe: PipesService) { }

  ngOnInit(): void {
    this.estudianteService.ListaEstudiantes().subscribe(resp => {
      if (resp.cod === "ERROR") {
        return;
      }
      this.dataSource = this.dcentral.llenarVariablesTabla(resp.users, this.paginator);
      this.lregistros = this.dataSource.data;
    })
  }

  ManejarPagina(e: PageEvent) {
    this.numero_pagina = e.pageIndex + 1;
    this.tamanio_pagina = e.pageSize;
  }

  abirDialgo( registro: any) {
    // this.dcentral.dialog.open(EditDialogComponent, { width: '400px', data: registro, })
    //   .afterClosed().subscribe(update => {
    //     if (update === true) {
    //       this.ObtenerListaCandidatos(this.id_lista)
    //     }
    //   })
  }

  /** Método para validar el ingreso de letras */
  soloLetras(e) {
    return this.dcentral.IngresarSoloLetras(e)
  }

  /** Método para validar el ingreso de números */
  soloNumeros(evt) {
    return this.dcentral.IngresarSoloNumeros(evt)
  }

  activeCheck(e){
    this.pipe.fiAct = e.checked;
    this.pipe.filtroBDSBoolean(this.dataSource, this.pipe.fiAct)
  }  

}
