import { Pipe, PipeTransform } from '@angular/core';
import { serializer } from './json-utils';

@Pipe({
  standalone: false,
  name: 'safeJson',
  pure: false,
})
export class SafeJsonPipe implements PipeTransform {
  transform(obj: any, spaces: number = 2): string {
    return JSON.stringify(obj, serializer(), spaces);
  }
}
