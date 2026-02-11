import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusValue',
})
export class StatusValuePipe implements PipeTransform {
  transform(value: boolean, ...args: unknown[]): string {
    return value ? 'Active' : 'Inactive';
  }
}
