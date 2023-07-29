import { IfilteredBook } from "./filteredBook";
import { User } from "./user";

export enum bookStatus {
  all = "All",
  new = "New",
  read = "Read",
  currently_reading = "Currently Reading",
  want_to_read = "Want to read",
}

export interface bookReview {
  _id?: Number;
  book_id?: IfilteredBook;
  rate?: Number;
  average_rate?: Number;
  book_status?: bookStatus;
  user_id?: User;
}
