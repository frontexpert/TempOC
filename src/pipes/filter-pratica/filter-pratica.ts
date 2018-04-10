import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPraticaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filterPratica',
})
export class FilterPraticaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], value: string) {
    if (!items) return [];
    return items.filter(it => {
    	return (it.ID.toString().indexOf(value) > -1 || it.Stato.toLowerCase().indexOf(value) > -1);
    });
  }
}
