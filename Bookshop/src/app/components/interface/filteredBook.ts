import { Iauthor } from "./author";

export interface IfilteredBook {
  _id?: string;
  book_id?: Number;
  image_url?: string;
  name: string;
  author_id: Iauthor;
}
