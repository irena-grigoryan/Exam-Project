import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epxonential'
})
export class EpxonentialPipe implements PipeTransform {

  transform(value: number, exponent = 1): number {
    console.log("11111")
    return Math.pow(value, exponent);
  }

}
