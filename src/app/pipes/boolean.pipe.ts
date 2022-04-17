import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activo'
})
export class ActivoPipe implements PipeTransform {

  transform(value: any[], arg: any): any {
    if(arg === undefined || arg === null ) return value;
    const RESULTADO_BUSQUEDAS = value.filter(o => o.activo === arg)
    return RESULTADO_BUSQUEDAS;
  }

}