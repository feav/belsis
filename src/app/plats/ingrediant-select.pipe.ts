import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingrediantSelect'
})
export class IngrediantSelectPipe implements PipeTransform {

	transform(items: any[], ingrediantSelect: string): any[] {
    	if(!items)
    		return [];
    	if(!ingrediantSelect)
    		return items;
    	ingrediantSelect = ingrediantSelect.toLowerCase();
    
    	return items.filter( it => {
      		return it.nom.toLowerCase().includes(ingrediantSelect);
    	});

    }

}
