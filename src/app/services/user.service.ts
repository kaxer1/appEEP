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

 /**
   * Metodo para registra estudiante.
   * @param data Datos del form
   */
  RegistrarEstudiante(data: any) {
    return this.http.post<any>(`${this.API_URL}/registrar`, data)
  }
  
  /**
   * Metodo para actualizar estudiante.
   * @param data Datos del form
   */
  ActualizarEstudiante(data: any) {
    return this.http.put<any>(`${this.API_URL}/update`, data)
  }

}
