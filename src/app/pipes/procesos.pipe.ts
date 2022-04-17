import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'procesos'
})
export class ProcesosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === undefined || arg === null || arg.length < 2 ) return value;
    const RESULTADO_BUSQUEDAS = [];
    for (const resultados of value) {
      if (resultados.id == arg) {
        RESULTADO_BUSQUEDAS.push(resultados);
      }
      if (resultados.descripcion.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        RESULTADO_BUSQUEDAS.push(resultados);
      }
      if (resultados.estado.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        RESULTADO_BUSQUEDAS.push(resultados);
      }
      if (resultados.semestre == arg) {
        RESULTADO_BUSQUEDAS.push(resultados);
      }
      if (resultados.fec_eleccion.indexOf(arg) > -1) {
        RESULTADO_BUSQUEDAS.push(resultados);
      }

    };
    
    let set = new Set( RESULTADO_BUSQUEDAS.map(obj => {
      return JSON.stringify(obj)
    }));

    let arrSinDuplicaciones = Array.from(set).map(obj => {
      return JSON.parse(obj)
    });

    return arrSinDuplicaciones;
  }

}
