import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { AuthService } from "src/app/service/authentication/auth.service";
import { User } from "../interface/user";
import $ from 'jquery';

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"],
})
export class SidenavComponent implements OnChanges, OnInit {
  user!: User;
  @Input() userFromAdmin!: User;
  status: boolean = false;
  constructor(private _UserService: AuthService) { }

  ngOnInit() {
    this.user = this._UserService.currentLogUser.value;
  }

  clickEvent() {
    this.status = !this.status;
  }

  ngOnChanges() {
    $('.sidebar-btn').on("click", function () {
      $(this).toggleClass("click");
      $('.sidebar').toggleClass("show");
    })

    $('.feat-btn').on("click", function () {
      $('nav ul .feat-show').toggleClass("show");

    });

    $('.serv-btn').on("click", function () {
      $('nav ul .serv-show').toggleClass("show1");
    });
  }
}

