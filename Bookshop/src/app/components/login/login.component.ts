import { TitleCasePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthService } from "src/app/service/authentication/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [MessageService],

})
export class LoginComponent {
  email!: string;
  password!: string;
  error?: String;
  loginForm!: FormGroup;
  submitted = false;
  user?: any;
  show = false;
  passwd!: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _AuthService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
    this.passwd = "password";
  }

  onSubmit(loginForm: FormGroup) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    if (this.loginForm.invalid) {
      return;
    }
    this._AuthService.login(loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);

        this._AuthService.detachToken();

        this.user = this._AuthService.currentLogUser.value;
        // console.log("user: --> :", this.user);
        if (this.user.is_admin == true) {
          this.router.navigate(["/admin/home"]);
        } else {
          this.router.navigate(["/"]);
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Login Failed",
          detail: `${err.error.Message}`,
          life: 3000,
        });
        // this.error = err.error.Message;
      },
    });

    this.submitted = true;
  }

  onClick() {
    if (this.passwd === "password") {
      this.passwd = "text";
      this.show = true;
    } else {
      this.passwd = "password";
      this.show = false;
    }
  }
}
