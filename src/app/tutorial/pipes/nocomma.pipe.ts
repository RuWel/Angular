import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nocomma',
  standalone: true
})
export class NoCommaPipe implements PipeTransform {

  transform(val: string | null): string {
    if (val !== undefined && val !== null) {
      // remove commas from input value
      return val.replace(/,/g, "");
    } else {
      return "";
    }
  }
}