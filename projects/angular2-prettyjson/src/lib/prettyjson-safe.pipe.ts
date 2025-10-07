import { Pipe, PipeTransform } from '@angular/core';
import { serializer } from './json-utils';

@Pipe({
  standalone: false,
  name: 'safejson',
  pure: false,
})
export class SafeJsonPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, spaces = 2): string {
    return JSON.stringify(value, serializer(), spaces);
  }
}
