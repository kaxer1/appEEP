import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProcesoService } from 'src/app/services/proceso.service';
import { MatPaginator } from '@angular/material/paginator';
import { DataCentralService } from 'src/app/libs/data-central.service';
import { EditDialogComponent } from './editdialog/editDialog.component';

@Component({
  selector: 'app-proceso-electoral',
  templateUrl: './proceso-electoral.component.html',
  styleUrls: ['./proceso-electoral.component.sass']
})
export class ProcesoElectoralComponent implements OnInit, AfterViewInit {

  /**
   * Variables Formulario
   */
  public grupoFormulario: FormGroup;

  /**
   * Variables Tabla de datos
   */
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  lregistros: any = [];
  filtroProcesos = '';

  constructor(
    private procesoService: ProcesoService,
    private dcentral: DataCentralService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.grupoFormulario = this.fb.group({
      id: [0, [Validators.required]],
      descripcion: ['', [Validators.maxLength(255)]],
      estado: [false],
      semestre: ['', [Validators.maxLength(255)]],
      fec_eleccion: ['', [Validators.required]],
      hora_inicio: ['', [Validators.required]],
      hora_final: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
    this.ObtenerDatosTabla();
    this.LimpiarCampos();
  }

  ObtenerDatosTabla() {
    this.procesoService.GetDatosTablaProcesoElectoral().subscribe((res) => {

      if (res.cod === "ERROR") {
        return;
      }
      this.dataSource = this.dcentral.llenarVariablesTabla(res.procesos, this.paginator);
      this.lregistros = this.dataSource.data;

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtroProcesos = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abirDialgo(registro: any) {
    this.dcentral.dialog.open(EditDialogComponent, { width: '400px', data: registro })
      .afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerDatosTabla()
        }
      })
  }

  GuardarProcesoElectoral(form) {
    this.procesoService.PostProcesoElectoral(form).subscribe(res => {
      if (res.cod == "ERROR") {
        return;
      }
      this.ObtenerDatosTabla();
      this.LimpiarCampos();
    })

  }

  /** Método para validar el ingreso de letras */
  IngresarSoloLetras(e) {
    return this.dcentral.IngresarSoloLetras(e)
  }

  /** Método para validar el ingreso de números */
  IngresarSoloNumeros(evt) {
    return this.dcentral.IngresarSoloNumeros(evt)
  }

  LimpiarCampos() {
    this.grupoFormulario.reset();
    this.grupoFormulario.setValue({
      id: 0,
      descripcion: '',
      estado: false,
      semestre: '',
      fec_eleccion: '',
      hora_inicio: '',
      hora_final: ''
    })
  }
}
