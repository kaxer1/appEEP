import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Cambiar el local de la APP
import localEsEC from '@angular/common/locales/es-EC'
import { registerLocaleData } from '@angular/common'
registerLocaleData(localEsEC)

// GUARDS
import { AuthGuard } from './guards/auth.guard';

// SERVICIOS
import { TokenInterceptorService } from './services/login/token-interceptor.service';
import { HttpErrorInterceptorService } from './libs/http-error-interceptor.service';
import { VotosService } from './services/votos.service';
import { LoginService } from './services/login/login.service';
import { UserService } from './services/user.service';
import { ProcesoService } from './services/proceso.service';
import { ListaService } from './services/lista.service';
import { CandidaturaService } from './services/candidatura.service';

// COMPONENTES
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';

// Modules
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './pages/login/login.module';
import { RecuperarPasswordModule } from './pages/login/recuperarpassword/recuperarpassword.module';
import { ConfirmarEmailModule } from './pages/login/confirmaremail/confirmaremail.module';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LoginModule,
    ConfirmarEmailModule,
    RecuperarPasswordModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    VotosService,
    LoginService,
    UserService,
    ProcesoService,
    ListaService,
    CandidaturaService,
    {
      provide: LOCALE_ID, useValue: 'es-EC'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }