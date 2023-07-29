import { Component, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { ActivatedRoute, ParamMap, RouterLinkActive } from "@angular/router";
import { BooksService } from "src/app/service/books/books.service";
import { Ibook } from "../interface/book";
import { bookReview } from "../interface/bookReview";
import { User } from "../interface/user";
import $ from 'jquery';
// RouterLinkActive

@Component({
  selector: "app-usersidebar",
  templateUrl: "./usersidebar.component.html",
  styleUrls: ["./usersidebar.component.css"],
})
export class UsersidebarComponent implements OnChanges {
  @Input() user!: User;
  // @Output() books = new EventEmitter();
  opened: boolean = false;
  filter!: ParamMap;
  open: boolean = false;
  @Input() filteredBooks?: bookReview[];
  @Output() newItemEvent = new EventEmitter<bookReview[]>();
  constructor(
    private _Router: ActivatedRoute,
    private _BookService: BooksService
  ) { }

  ngOninit() { }

  // getFilteredBooks(event: any) {
  //   this._BookService
  //     .getBookWithStatus(this.user?.user_id, this.filter.get("filter"))
  //     .subscribe((books) => {
  //       this.filteredBooks = books;
  //       this.filteredBooks = event as bookReview[];
  //       this.newItemEvent.emit(this.filteredBooks);
  //       console.log(this.filteredBooks);
  //     });
  // }

  ngOnChanges() {
    $('.sidebar-btn').click(function () {
      $(this).toggleClass("click");
      $('.sidebar').toggleClass("show");
    })

    $('.feat-btn').click(function () {
      $('nav ul .feat-show').toggleClass("show");

    });

    $('.serv-btn').click(function () {
      $('nav ul .serv-show').toggleClass("show1");
    });
  }

  
  toggleMenu() {
    console.log(this.open);
    this.open = !this.open;
  }

}
