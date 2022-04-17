import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  API_URL = environment.url + '/seguridad';

  constructor(private http: HttpClient) { }
  
  /**
   * Obtener info tabla menu
   * @returns 
   */
  ListarMenu() {
    return this.http.get<any>(`${this.API_URL}/menu`)
  }
  
  /**
   * Obtener info tabla transaccion
   * @returns 
   */
  ListarTransaccion() {
    return this.http.get<any>(`${this.API_URL}/transaccion`)
  }
  
  /**
   * Obtener info tabla rol
   * @returns 
   */
  ListarRol() {
    return this.http.get<any>(`${this.API_URL}/rol`)
  }

  /**
   * Mantenimiento tabla menu
   * @returns 
   */
   MantenimientoMenu(data: any, update = 0) {
    const params = new HttpParams()
    .set('update', update.toString())
    return this.http.post<any>(`${this.API_URL}/menu`, {data}, {params})
  }
  
  /**
   * Mantenimiento tabla transaccion
   * @returns 
   */
   MantenimientoTransaccion(data: any, update = 0) {
    const params = new HttpParams()
    .set('update', update.toString())
    return this.http.post<any>(`${this.API_URL}/transaccion`, {data}, {params})
  }
  
  /**
   * Mantenimiento tabla rol
   * @returns 
   */
   MantenimientoRol(data: any, update = 0) {
    const params = new HttpParams()
    .set('update', update.toString())
    return this.http.post<any>(`${this.API_URL}/rol`, {data}, {params})
  }

}
