import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { bookReview } from "src/app/components/interface/bookReview";
import { AuthService } from "../authentication/auth.service";
import { Ibook } from "./../../components/interface/book";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  constructor(
    private _HttpClient: HttpClient,
    private _UserService: AuthService
  ) { }

  headers = { "access-token": `${this._UserService.getToken()}` };

  requestOptions = { headers: this.headers };

  getAllBooks(): Observable<Ibook[]> {
    return this._HttpClient.get<Ibook[]>(
      "http://localhost:5000/book",
      this.requestOptions
    );
  }

  getAllReviewForSpecificBook(book_id: any): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5000/bookreview/review/${book_id}`
    );
  }


  getBookRate(book_id: any, user_id: any): Observable<any> {
    return this._HttpClient.get(
      `http://localhost:5000/bookreview/rate/${book_id}/${user_id}`,
      this.requestOptions
    );
  }

  updateBook(updatedBook: any, book_id: any): Observable<bookReview> {
    return this._HttpClient.patch<bookReview>(
      `http://localhost:5000/profile/bookreview/${book_id}`,
      updatedBook,
      this.requestOptions
    );
  }

  addReviewText(
    newReview: any,
    book_id: any,
    user_id: any
  ): Observable<bookReview> {
    console.log(newReview);

    return this._HttpClient.post<bookReview>(
      `http://localhost:5000/profile/bookreview/review/${book_id}/${user_id}`, //   /profile/bookreview/review/
      newReview,
      this.requestOptions
    );
  }

  addBookReview(book_id: any): Observable<bookReview> {
    // console.log("header: ",this.headers);
    return this._HttpClient.post<bookReview>(
      "http://localhost:5000/profile/bookreview",
      { book_id },
      this.requestOptions
    );
  }

  getBookById(book_id: any): Observable<Ibook> {
    return this._HttpClient.get<Ibook>(
      `http://localhost:5000/book/${book_id}`,
      this.requestOptions
    );
  }

  getAllbooksForSpecificUser(user_id: string): Observable<Ibook[]> {
    return this._HttpClient.get<Ibook[]>(
      `http://localhost:5000/profile/${user_id}`,
      this.requestOptions
    );
  }

  getBookWithStatus(user_id: string, status: any): Observable<Ibook[]> {
    console.log("id: " + user_id + " status: " + status);
    return this._HttpClient.get<Ibook[]>(
      `http://localhost:5000/profile/${user_id}?filter=${status}`,
      this.requestOptions
    );
  }

  deleteReviewText(review_id: any, book_id: any): Observable<any> {
    return this._HttpClient.delete(`http://localhost:5000/profile/bookreview/review/${review_id}/${book_id}`,
      this.requestOptions
    );
  }
  updateReviewText(newReview: any, review_id: any): Observable<bookReview> {
    console.log(review_id);
    
    return this._HttpClient.patch(`http://localhost:5000/profile/bookreview/review/${review_id}`, newReview,
      this.requestOptions
    );
  }

  popularBooks(): Observable<any> {
    return this._HttpClient.get<any>("http://localhost:5000/popularbook");
  }


  // getBookReviews(book_id: any): Observable<bookReview[]> {
  //   return this._HttpClient.get<bookReview[]>(
  //     `http://localhost:5000/bookreview/${book_id}`
  //   );
  // }
}
