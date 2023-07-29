import { Iauthor } from "./author";
import { ICategory } from "./category";
import { IfilteredBook } from "./filteredBook";

export interface Ibook {
  _id?: Number;
  book_id?: IfilteredBook;
  image_url?: string;
  name?: string;
  book_description?: string;
  category_id?: ICategory;
  author_id?: Iauthor;
}
