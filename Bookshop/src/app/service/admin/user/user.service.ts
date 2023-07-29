import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../authentication/auth.service";
import { User } from "src/app/components/interface/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private _HttpClient: HttpClient,
    private _UserService: AuthService
  ) { }
  headers = { "access-token": `${this._UserService.getToken()}` };

  requestOptions = { headers: this.headers };

  getAllUser(): Observable<any[]> {
    return this._HttpClient.get<any[]>(
      "http://localhost:5000/admin/user",
      this.requestOptions
    );
  }

  addUser(data: any) {
    return this._HttpClient.post(`http://localhost:5000/admin/user/`, data, this.requestOptions);
  }
  getUserByID(user_id: any) {
    return this._HttpClient.get(`http://localhost:5000/admin/user/${user_id}`, this.requestOptions);
  }

  deleteUser(user_id: any): Observable<any> {
    return this._HttpClient.delete<any>(
      `http://localhost:5000/admin/user/${user_id}`,
      this.requestOptions
    );
  }

  updateUser(data: any, user_id: any): Observable<any> {
    console.log(data);
    return this._HttpClient.patch<any>(
      `http://localhost:5000/admin/user/${user_id}`,
      data,
      this.requestOptions
    );
  }
}
