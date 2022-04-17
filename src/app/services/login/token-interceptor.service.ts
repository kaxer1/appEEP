import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { DataCentralService } from '../../libs/data-central.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private dcentral: DataCentralService,
    private loginServices: LoginService
  ) { }

  // con esta clase me ayuda añadir la cabecera de autorizacion en cada peticion que se realice a la API
  intercept(req, next) {
    this.dcentral.setLoading(true);
    let auth = '';
    if (this.dcentral.validarToken()) {
      auth = `Bearer ${this.loginServices.getToken()}`
    } 
    
    if (this.dcentral.validarTokenRecuperacion()) {
      auth = `Bearer ${this.loginServices.getTokenRecuperacion()}`
    }

    const tokenizeReq = req.clone({
      setHeaders: {
        authorization: auth
      }
    });
    return next.handle(tokenizeReq);
  }
  
}
