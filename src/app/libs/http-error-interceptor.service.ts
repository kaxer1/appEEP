import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../services/login/login.service';
import { DataCentralService } from './data-central.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private dcentral: DataCentralService, private login: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          this.dcentral.setLoading(false);
          if (evt.body && evt.body.cod == "OK") {
            if (evt.body.message !== "") {
              this.dcentral.mostrarmsgexito(evt.body.message);
            }
          }
          if (evt.body && evt.body.cod == "ERROR")
            this.dcentral.mostrarmsgerror(evt.body.message);
        }
      }),
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Aplicacion error: ${error.error.message}`;
        } else {
          // backend error
          errorMessage = `Servidor error: ${error.status} ${error.message}`;
          if (error.status === 401) {
            this.login.logout()
          }
        }

        // Muestra el mensaje de error.
        this.dcentral.mostrarmsgerror(errorMessage);
        this.dcentral.setLoading(false);
        return throwError(errorMessage);
      })
    );
  }
}