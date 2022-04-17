import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  API_URL = environment.url + '/lista';

  constructor(private http: HttpClient) { }

  /**
   * Obtinen todos los registros de las listas electorales de acuerdo a un determinado proceso electoral
   * @param id_proceso Id del proceso electoral
   */
  GetLista(id_proceso: number) {
    return this.http.get<any>(`${this.API_URL}/lista/${id_proceso}`)

  }

  /**
   * Metodo para subir imagen y actulizar el registro.
   * @param formData FormData de la imagen del proceso electoral
   * @param id_lista Id de la lista a quien actualizara el campo de logo en su registro
   */
  SubirImagen(formData, id_lista: number) {
    return this.http.put(`${this.API_URL}/img-lista/${id_lista}`, formData)

  }

  /**
   * Metodo para registra lista electoral o candidatura.
   * @param data Datos del form
   */
  RegistrarLista(data: any) {
    return this.http.post<any>(`${this.API_URL}/registrar-lista`, data)
  }
  
  /**
   * Metodo para actualizar lista electoral o candidatura.
   * @param data Datos del form
   */
  ActualizarLista(data: any) {
    return this.http.put<any>(`${this.API_URL}/update-lista`, data)
  }
}
