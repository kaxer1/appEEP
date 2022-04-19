import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from 'src/app/services/lista.service';
import { RegistrarDialogComponent } from './registrardialog/registrarDialog.component';
import { DataCentralService } from '../../../libs/data-central.service';
import { EditDialogComponent } from './editdialog/editDialog.component';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.sass']
})
export class ListasComponent implements OnInit {

  id_proceso: number;
  QueryParams: any = [];

  Btn_Agregar: boolean = false;
  listaCandidatos: any = [];

  HabilitarCards: boolean = false;
  constructor(
    private rutaActiva: ActivatedRoute,
    private listaService: ListaService,
    private dcentral: DataCentralService
  ) { }

  ngOnInit(): void {

    this.id_proceso = parseInt(this.rutaActiva.snapshot.params.id)

    this.FuncionalidadInicial();
    this.ObtenerLista(this.id_proceso)
  }

  abirDialgo(registro: any) { 
    this.dcentral.dialog.open(EditDialogComponent, { width: '800px', data: registro})
      .afterClosed().subscribe(update => {
        if (update === true) {
          this.FuncionalidadInicial();
          this.ObtenerLista(this.id_proceso)
        }
      })
  }

  FuncionalidadInicial() {
    this.rutaActiva.queryParams.subscribe(obj => {
      this.QueryParams = [obj];
      if (obj.estado === 'vijente') {
        this.Btn_Agregar = true
      }

    })
  }

  ObtenerLista(id_proceso: number) {
    this.listaCandidatos = [];
    this.listaService.GetLista(id_proceso).subscribe(res => {

      if (res.message === 'ERROR') {
        return;
      }
      this.listaCandidatos = res.LISTA;
      this.HabilitarCards = true;

    })
  }

  AbrirVentanaRegistroCandidatura() {
    this.dcentral.dialog.open(RegistrarDialogComponent, { width: '800px', data: { id_proceso: this.id_proceso } })
      .afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerLista(this.id_proceso);
        }
      })
  }

  GuardarImagenLocal(imagen: string) {
    localStorage.removeItem('imagen-lista')
    localStorage.setItem('imagen-lista', imagen)
  }

}
