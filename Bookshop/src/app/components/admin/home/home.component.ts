import { Component, Input } from "@angular/core";
import { AuthorService } from "src/app/service/admin/author/author.service";
import { BookService } from "src/app/service/admin/book/book.service";
import { CategoryService } from "src/app/service/admin/category/category.service";
import { UserService } from "src/app/service/admin/user/user.service";
import { AuthService } from "src/app/service/authentication/auth.service";
import { Iauthor } from "../../interface/author";
import { Ibook } from "../../interface/book";
import { ICategory } from "../../interface/category";
import { User } from "../../interface/user";

@Component({
  selector: "app-admin-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class AdminHomeComponent {
  user!: User;
  users!: User[];
  usersLength!: Number;
  categories!: ICategory[];
  categoriesLength!: Number;
  books!: Ibook[];
  booksLength!: Number;
  authors!: Iauthor[];
  authorsLength!: Number;

  constructor(private _AuthService: AuthService,
    private _UserService: UserService,
    private _BookService: BookService,
    private _AuthorService: AuthorService,
    private _CategoryService: CategoryService) { }

  ngOnInit() {
    this._AuthService.currentLogUser.subscribe((user) => {
      this.user = user;
    });

    this._UserService.getAllUser().subscribe((user) => {
      this.users = user;
      this.usersLength = this.users.length;
    })

    this._BookService.getAllBook().subscribe((book) => {
      this.books = book;
      this.booksLength = this.books.length;
    })

    this._CategoryService.getAllCategory().subscribe((category) => {
      this.categories = category;
      this.categoriesLength = this.categories.length;
    })

    this._AuthorService.getAllAuthor().subscribe((author) => {
      this.authors = author;
      this.authorsLength = this.authors.length;
    })
  }
}
