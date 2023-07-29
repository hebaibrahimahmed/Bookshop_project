import { Pipe, PipeTransform } from '@angular/core';
import { Ibook } from '../interface/book';

@Pipe({
    name: 'Book_Filter'
})
export class Book_Filter implements PipeTransform {
    transform(books: Ibook[], searchTerm: string): Ibook[] {
        if (!searchTerm) {
            return books;
        }

        searchTerm = searchTerm.toLowerCase();

        return books.filter(book => book.name?.toLowerCase().includes(searchTerm));
    }
}