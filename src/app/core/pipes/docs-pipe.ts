import { Pipe, PipeTransform } from '@angular/core';
import { AppOptions } from '../enums/app.enums';

@Pipe({
  name: 'docs',
})
export class DocsPipe implements PipeTransform {

  transform(value: AppOptions, type: string): string {
    let result = '';
    result += type.toUpperCase() + ':  ' +
  }

}

