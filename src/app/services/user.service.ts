import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = environment.url + '/estudiantes';

  constructor(private http: HttpClient) { }
  
  /**
   * Lista de estudiantes
   * @returns 
   */
  ListaEstudiantes() {
    return this.http.get<any>(`${this.API_URL}/lista`)
  }

}
