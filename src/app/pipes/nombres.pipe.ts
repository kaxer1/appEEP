import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombres'
})
export class NombresPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === undefined || arg === null || arg.length < 2 ) return value;
    const RESULTADO_BUSQUEDAS = [];
    for (const resultados of value) {
      if (resultados.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        RESULTADO_BUSQUEDAS.push(resultados);
      }
    };
    return RESULTADO_BUSQUEDAS;
  }

}

@Pipe({
  name: 'fullname'
})
export class FullNamePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === undefined || arg === null || arg.length < 2 ) return value;
    const RESULTADO_BUSQUEDAS = [];
    for (const resultados of value) {
      if (resultados.fullname.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        RESULTADO_BUSQUEDAS.push(resultados);
      }
    };
    return RESULTADO_BUSQUEDAS;
  }

}

@Pipe({
  name: 'cedula'
})
export class CedulaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === undefined || arg === null || arg.length < 2 ) return value;
    const RESULTADO_BUSQUEDAS = [];
    for (const resultados of value) {
      if (resultados.cedula.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        RESULTADO_BUSQUEDAS.push(resultados);
      }
    };
    return RESULTADO_BUSQUEDAS;
  }

}
