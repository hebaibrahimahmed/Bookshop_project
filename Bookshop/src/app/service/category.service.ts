import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { Ibook } from "../components/interface/book";
import { ICategory } from "../components/interface/category";
import { AuthService } from "./authentication/auth.service";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(
    private _HttpClient: HttpClient,
    private _UserService: AuthService
  ) {}

  headers = { "access-token": `${this._UserService.getToken()}` };

  requestOptions = { headers: this.headers };

  getAllCategory(): Observable<ICategory[]> {
    return this._HttpClient.get<ICategory[]>(
      "http://localhost:5000/category",
      this.requestOptions
    );
  }

  getBooksByCategoryId(categoryId: any): Observable<Ibook[]> {
    return this._HttpClient.get<Ibook[]>(
      `http://localhost:5000/category/${categoryId}`,
      this.requestOptions
    );
  }
  
}
