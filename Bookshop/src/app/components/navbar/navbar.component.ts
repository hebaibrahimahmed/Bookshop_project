import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { AuthService } from "src/app/service/authentication/auth.service";
import { User } from "../interface/user";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  animations: [
    trigger("arrowAnimation", [
      state("collapsed", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition("collapsed <=> expanded", animate("300ms ease-in-out")),
    ]),
  ],
})
export class NavbarComponent {
  @ViewChild("navbarNavAltMarkup", { static: true })
  navbar!: ElementRef;

  navbarExpanded = false;
  islogged = false;
  isAdmin = false;
  user?: User;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.authService.currentLogUser.subscribe((response) => {
      console.log(response);
      
      if (this.authService.currentLogUser.getValue().email === "") {
        this.islogged = false;
        // this.user = this.authService.currentLogUser.value;
      } else if (
        this.authService.currentLogUser.getValue().email !== "" &&
        this.authService.currentLogUser.getValue().is_admin === false
      ) {
        this.islogged = true;
        this.isAdmin = false;
        this.user = this.authService.currentLogUser.value;
      } else {
        this.islogged = true;
        this.isAdmin = true;
        this.user = this.authService.currentLogUser.value;
      }
    });
  }

  ngOnInit(): void { }

  toggleNavbar(): void {
    this.navbarExpanded = !this.navbarExpanded;
  }

  logout(): void {
    this.authService.logout();
    this.islogged = false;
    this.isAdmin = false;
  }

}
