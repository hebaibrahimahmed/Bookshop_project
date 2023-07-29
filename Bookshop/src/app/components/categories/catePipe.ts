import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../interface/category';

@Pipe({
    name: 'Cat_Filter'
})
export class Cat_Filter implements PipeTransform {
    transform(categories: ICategory[], searchTerm: string): ICategory[] {
        if (!searchTerm) {
            return categories;
        }

        searchTerm = searchTerm.toLowerCase();

        return categories.filter(category => category.name?.toLowerCase().includes(searchTerm));
    }
}