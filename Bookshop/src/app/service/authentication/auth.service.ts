import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "./../../components/interface/user";
import { environment } from "../../../../environment";
import { Observable, BehaviorSubject } from "rxjs";
import jwtDecode from "jwt-decode";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  currentLogUser = new BehaviorSubject<User>({
    user_id: "",
    first_name: "",
    last_name: "",
    birth_date: new Date(),
    email: "",
    address: "",
    password: "",
    gender: "",
    image_url: "",
  });
  private token?: any;
  private apiBaseUrl = environment.apiBaseUrl;
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem("token") != null) this.detachToken();
  }

  // register(user: User, _formData: FormData) {
  //   return this._HttpClient.post<any>(
  //     `${this.apiBaseUrl}/register`,
  //     formatDate,
  //     {
  //       params: user,
  //       reportProgress: true,
  //       observe: "events",
  //     }
  //   );
  // }

  register(formData: FormData) {
    return this._HttpClient.post<any>(`${this.apiBaseUrl}/register`, formData, {
      reportProgress: true,
      observe: "events",
    });
  }

  login(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.apiBaseUrl}/login`, formData);
  }

  detachToken() {
    this.token = localStorage.getItem("token");
    this.currentLogUser.next(jwtDecode(this.token));
  }

  getToken() {
    return localStorage.getItem("token");
  }

  logout() {
    this.currentLogUser.next({
      user_id: "",
      first_name: "",
      last_name: "",
      birth_date: new Date(),
      email: "",
      address: "",
      password: "",
      gender: "",
      image_url: "",
    });
    localStorage.removeItem("token");
    this._Router.navigate(["/login"]);
  }
}
