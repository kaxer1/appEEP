import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProcesoService } from 'src/app/services/proceso.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataCentralService } from 'src/app/libs/data-central.service';
import { EditDialogComponent } from './editdialog/editDialog.component';

@Component({
  selector: 'app-proceso-electoral',
  templateUrl: './proceso-electoral.component.html',
  styleUrls: ['./proceso-electoral.component.sass']
})
export class ProcesoElectoralComponent implements AfterViewInit {

  /**
   * Variables Formulario
   */
  descripcionCtrl = new FormControl('', Validators.required);
  semestreCtrl = new FormControl('', Validators.required);
  fec_eleccionCtrl = new FormControl('', Validators.required);
  horainicioCtrl = new FormControl('', Validators.required);
  horafinCtrl = new FormControl('', Validators.required);

  public ProcesoElectoralForm = new FormGroup({
    descripcion: this.descripcionCtrl,
    semestre: this.semestreCtrl,
    fec_eleccion: this.fec_eleccionCtrl,
    horainicio: this.horainicioCtrl,
    horafin: this.horafinCtrl
  });

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
  ) {
    this.ProcesoElectoralForm.patchValue({
      descripcion: '',
      semestre: '',
      fec_eleccion: '',
      horainicio: '',
      horafin: ''
    })
  }

  ngAfterViewInit() {
    this.ObtenerDatosTabla()
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
    this.dcentral.dialog.open(EditDialogComponent, { width: '400px', data: registro})
      .afterClosed().subscribe(update => {
        if (update === true) {
          this.ObtenerDatosTabla()
        }
      })
  }

  GuardarProcesoElectoral(form) {

    let data = {
      descripcion: form.descripcion,
      semestre: form.semestre,
      fec_eleccion: form.fec_eleccion.toJSON().split("T")[0],
      hora_inicio: form.horainicio,
      hora_final: form.horafin
    }

    this.procesoService.PostProcesoElectoral(data).subscribe(res => {
      if (res.cod == "ERROR") {
        return;
      }
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
    this.ProcesoElectoralForm.reset();
  }
}
