import { Component } from "@angular/core";
import { AuthService } from "src/app/service/authentication/auth.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  islogged!: boolean;
  user!: any;

  constructor(private authService: AuthService) {
    this.authService.currentLogUser.subscribe(() => {
      if (
        this.authService.currentLogUser.getValue().email === "" ||
        this.authService.currentLogUser.value.is_admin == true
      ) {
        this.islogged = false;
      } else {
        this.islogged = true;
        this.user = this.authService.currentLogUser.value;
      }
    });
  }
}
