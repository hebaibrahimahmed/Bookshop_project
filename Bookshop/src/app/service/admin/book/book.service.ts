import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../authentication/auth.service";
import { Observable } from "rxjs";
import { User } from "src/app/components/interface/user";
import { Ibook } from "src/app/components/interface/book";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(
    private _HttpClient: HttpClient,
    private _UserService: AuthService
  ) { }
  headers = { "access-token": `${this._UserService.getToken()}` };

  requestOptions = { headers: this.headers };
  getAllBook(): Observable<any[]> {
    return this._HttpClient.get<any[]>(
      "http://localhost:5000/admin/book",
      this.requestOptions
    );
  }

  addBook(data: any): Observable<any> {
    console.log(data);

    return this._HttpClient.post<any>("http://localhost:5000/admin/book", data,
      this.requestOptions
    );
  }

  updateBook(data: any, book_id: any): Observable<any> {
    console.log(data);
    
    return this._HttpClient.patch(`http://localhost:5000/admin/book/${book_id}`, data, this.requestOptions);
  }

  deleteBook(book_id: any): Observable<User> {
    return this._HttpClient.delete<User>(
      `http://localhost:5000/admin/book/${book_id}`,
      this.requestOptions
    );
  }
}
