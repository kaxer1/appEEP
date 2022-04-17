import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CandidaturaService } from 'src/app/services/candidatura.service';
import { DataCentralService } from '../../../libs/data-central.service';
import { ICandidatos } from '../../../interfaces/proceso.interface';
import { EditDialogComponent } from './editdialog/editDialog.component';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.sass']
})
export class CandidatosComponent implements OnInit {

  /**
   * Variables inicio de pantalla
   */
  id_lista: number;
  QueryParams: any = [];
  imagen_local: string;
  HabilitarRegistro: boolean = false;

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
  
  /**
   * Variables Tabla de datos
   */
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  candidatos: any = [];

  constructor(
    private rutaActiva: ActivatedRoute,
    private candidaturaService: CandidaturaService,
    private dcentral: DataCentralService
  ) { }

  ngOnInit(): void {
    this.id_lista = parseInt(this.rutaActiva.snapshot.params.id)

    this.FuncionalidadInicial();
    this.ObtenerListaCandidatos(this.id_lista)
  }

  FuncionalidadInicial() {
    this.imagen_local = localStorage.getItem('imagen-lista')

    this.rutaActiva.queryParams.subscribe(obj => {
      this.QueryParams = [obj];
      if (obj.estado === 'true') {
        this.HabilitarRegistro = true
      }

    })
  }

  ObtenerListaCandidatos(id_lista) {
    this.candidatos = []
    this.candidaturaService.ListaCandidatos(id_lista).subscribe(res => {
      
      if (res.cod == "ERROR") { return; }

      this.dataSource = new MatTableDataSource(res.LISTA_CANDIDATOS as ICandidatos[]);
      this.candidatos = this.dataSource.data
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  GuardarCandidato(form) {
    let data = {
      nombre: form.nombre,
      apellido: form.apellido,
      cargo: form.cargo,
      id_lista: this.id_lista
    }
    this.candidaturaService.RegistrarCandidato(data).subscribe(res => {
      if (res.cod === "ERROR") {
        this.HabilitarRegistro = false;
        return;
      }
      this.ObtenerListaCandidatos(this.id_lista);
      this.LimpiarCampos();
    })
  }

  LimpiarCampos() {
    this.CandidatosForm.reset();
  }

  abirDialgo( registro: any) {
    this.dcentral.dialog.open(EditDialogComponent, { width: '400px', data: registro, })
      .afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerListaCandidatos(this.id_lista)
        }
      })
  }
}
