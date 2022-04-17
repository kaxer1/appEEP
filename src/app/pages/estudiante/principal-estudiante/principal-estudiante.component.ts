import { Component, OnInit } from '@angular/core';
import { Proceso, Lista_electoral } from 'src/app/interfaces/proceso.interface';
import { ProcesoService } from '../../../services/proceso.service';
import { VotosService } from '../../../services/votos.service';
import { DataCentralService } from '../../../libs/data-central.service';
import { User } from '../../../interfaces/user.iterface';
import { procesoValueDefault } from '../../../interfaces/proceso.interface';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-principal-estudiante',
  templateUrl: './principal-estudiante.component.html',
  styleUrls: ['./principal-estudiante.component.sass']
})
export class PrincipalEstudianteComponent implements OnInit {

  procesos: Proceso = procesoValueDefault;

  showVotos: boolean = true;

  public get user(): User {
    return this.dcentral.user
  }

  constructor(
    private procesoService: ProcesoService,
    private votoService: VotosService,
    private loginService: LoginService,
    private dcentral: DataCentralService
  ) { }

  ngOnInit() {
    this.procesoService.infoProcesoToUsuarios().subscribe(
      procesos => { this.procesos = procesos.PROCESO }
    )
  }

  saveVoto(option_lista: Lista_electoral) {
    option_lista.contenido = '';
    this.votoService.postVotoUsuario(option_lista).subscribe(res => {

      if (res.cod === "ERROR") {
        return;
      }
      this.showVotos = false;
      delete this.procesos;
      this.loginService.logout();
    })
  }

}
