import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'severity',
})
export class SeverityPipe implements PipeTransform {
  transform(
    value: boolean,
    ...args: unknown[]
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null | undefined {
    return value ? 'success' : 'danger';
  }
}
