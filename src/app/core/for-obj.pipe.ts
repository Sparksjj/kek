import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forObj'
})
export class ForObjPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const key in value) {
      keys.push(value[key]);
    }
    return keys;
  }
}
