import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../authentication/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorService {
  url: string = "http://localhost:5000/admin/author";
  constructor(
    private _HttpClient: HttpClient,
    private _UserService: AuthService
  ) { }
  headers = { "access-token": `${this._UserService.getToken()}` };

  requestOptions = { headers: this.headers };

  getAllAuthor(): Observable<any> {
    return this._HttpClient.get<any>(
      this.url,
      this.requestOptions
    );
  }

  addAuthor(data: any): Observable<any> {
    return this._HttpClient.post<any>(this.url, data, this.requestOptions);
  }

  updateAuthor(data: any, author_id: any) {
    return this._HttpClient.patch(
      `${this.url}/${author_id}`,
      data,
      this.requestOptions
    );
  }

  deleteAuthor(author_id: any): Observable<any> {
    return this._HttpClient.delete<any>(
      `${this.url}/${author_id}`,
      this.requestOptions
    );
  }
}
