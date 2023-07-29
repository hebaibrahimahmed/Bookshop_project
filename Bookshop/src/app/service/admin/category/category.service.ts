import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../authentication/auth.service";
import { ICategory } from "src/app/components/interface/category";
import { Observable } from "rxjs";
import { Ibook } from "src/app/components/interface/book";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(
    private _HttpClient: HttpClient,
    private _UserService: AuthService
  ) { }

  headers = { "access-token": `${this._UserService.getToken()}` };

  requestOptions = { headers: this.headers };

  getAllCategory(): Observable<ICategory[]> {
    return this._HttpClient.get<ICategory[]>(
      "http://localhost:5000/admin/category",
      this.requestOptions
    );
  }

  getBooksByCategoryId(categoryId: any): Observable<Ibook[]> {
    return this._HttpClient.get<Ibook[]>(
      `http://localhost:5000/admin/category/${categoryId}`,
      this.requestOptions
    );
  }

  addCategory(data: any): Observable<any> {
    return this._HttpClient.post<any>(`http://localhost:5000/admin/category`, data, this.requestOptions)
  }

  updateCategory(data: any, category_id: any): Observable<any> {
    return this._HttpClient.patch<any>(`http://localhost:5000/admin/category/${category_id}`,
      data,
      this.requestOptions
    )
  }

  deleteCategory(categoryId: any): Observable<Ibook> {
    return this._HttpClient.delete<Ibook>(
      `http://localhost:5000/admin/category/${categoryId}`,
      this.requestOptions
    );
  }
}
