import { Component } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "src/app/service/authentication/auth.service";
import { BooksService } from "src/app/service/books/books.service";
import { Ibook } from "../interface/book";
import { bookReview, bookStatus } from "../interface/bookReview";
import { User } from "../interface/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent {
  user!: User;
  books?: bookReview[];
  filter!: ParamMap;
  filtered_books?: bookReview[];
  showFiller = false;

  status = [
    { value: 'currently_reading', viewValue: 'Reading' },
    { value: 'want_to_read', viewValue: 'want to read' },
    { value: 'read', viewValue: 'Finished' },
  ]

  constructor(
    private _UserService: AuthService,
    private _BookService: BooksService,
    private _Router: ActivatedRoute
  ) {
    this._Router.queryParamMap.subscribe((query) => {
      this.filter = query;
      // console.log(query.get("filter"));
      this.user = this._UserService.currentLogUser.value;
      this._BookService
        .getBookWithStatus(this.user.user_id, this.filter.get("filter"))
        .subscribe((book) => {
          this.books = book;
        });
    });
  }

  ngOnInit() { }

  onRatingChanged(book: any, rate: any) {
    const rating = { rate: rate.value };
    this._BookService.updateBook(rating, book._id).subscribe({
      next: (book) => {
        console.log(book)
        this._BookService.getAllbooksForSpecificUser(this.user.user_id).subscribe({
          next: (books) => {
            this.books = books;
            console.log(books);
          },
          error: (err) => {
            console.log("err");
          },
        })
      },
      error: (err) => {
        console.log("err");
      }
    })
  }

  removeRate(book: any) {
    const rating = { rate: 0 };
    this._BookService.updateBook(rating, book._id).subscribe({
      next: (book) => {
        this._BookService.getAllbooksForSpecificUser(this.user.user_id).subscribe({
          next: (books) => {
            this.books = books;
          },
          error: (err) => {
            console.log("err");
          },
        })
      },
      error: (err) => {
        console.log("err");
      }
    })
  }


  onStateChanged(book: any, state: any) {
    const userNewStatus = { book_status: state.value };
    this._BookService.updateBook(userNewStatus, book._id).subscribe({
      next: (book) => {
        console.log(book)
        this._BookService.getAllbooksForSpecificUser(this.user.user_id).subscribe({
          next: (books) => {
            this.books = books;
            console.log(books);
          },
          error: (err) => {
            console.log("err");
          },
        })
      },
      error: (err) => {
        console.log("err");
      }
    })
  }
  /*******************************sidebar*********************** */
}
