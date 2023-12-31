import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./service/authentication/auth.service";

@Injectable({
  providedIn: "root",
})
export class RouteGuard implements CanActivate {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._AuthService.currentLogUser.value.is_admin) {
      this._Router.navigate(["/admin/home"]);
      return false;
    } else {
      return true;
    }
  }
}
