import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaderResponse,HttpHeaders,} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../authentication/auth.service";
import { Iauthor } from "./../../components/interface/author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

   constructor(
    private _HttpClient: HttpClient,
    private _UserService: AuthService
  ) { }
  headers = { "access-token": `${this._UserService.getToken()}` };

  requestOptions = { headers: this.headers };

  getAllauthors(): Observable<any[]> {
    return this._HttpClient.get<any[]>(
      "http://localhost:5000/author",
      this.requestOptions
    );
  }
  getAuthorById(author_id: any): Observable<any> {    
    return this._HttpClient.get<any>(
      `http://localhost:5000/author/${author_id}`,
      this.requestOptions
    );
  }
}
