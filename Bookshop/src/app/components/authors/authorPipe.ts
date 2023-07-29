import { Pipe, PipeTransform } from '@angular/core';
import { Iauthor } from '../interface/author';
import { ICategory } from '../interface/category';

@Pipe({
    name: 'Author_Filter'
})
export class Author_Filter implements PipeTransform {
    fullName!: string;
    transform(authors: Iauthor[], searchTerm: string): Iauthor[] {
        if (!searchTerm) {
            return authors;
        }

        searchTerm = searchTerm.toLowerCase();

        return authors.filter(author => {
            this.fullName = author.first_name + " " + author.last_name;
           return  (this.fullName).toLowerCase().includes(searchTerm)
        });
    }
}