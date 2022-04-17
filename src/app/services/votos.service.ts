import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lista_electoral } from '../interfaces/proceso.interface';

@Injectable({
  providedIn: 'root'
})
export class VotosService {

  API_URL = environment.url + '/voto';

  constructor(private http: HttpClient) { }

  getVotosTotales() {
    return this.http.get<any>(`${this.API_URL}/ver`)
  }

  postVotoUsuario(data: Lista_electoral) {
    return this.http.post<any>(`${this.API_URL}/registrar`, data)

  }

}
