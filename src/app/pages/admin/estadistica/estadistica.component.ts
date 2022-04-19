import { Component, OnInit } from '@angular/core';
import { VotosService } from 'src/app/services/votos.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.sass']
})
export class EstadisticaComponent implements OnInit {

  votos: any = [];
  results: any = [];

  constructor(
    private votoServices: VotosService
  ) { }

  ngOnInit() {
    this.votoServices.getVotosTotales().subscribe(res => {
      this.votos = res
      this.mapingResults(res)
    })
  }

  mapingResults(votos: any[]) {
    const data = votos.filter(o => {
      return o.index > 0
    }).map(o => {
      const { id, nom_lista } = o.data
      return { nom_lista }
    }).reduce((a, l) => (a[l.nom_lista] ? a[l.nom_lista] += 1 : a[l.nom_lista] = 1, a), {})
    this.results = data
  }

}
