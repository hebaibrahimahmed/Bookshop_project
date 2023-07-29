import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BooksService } from "src/app/service/books/books.service";
import { CategoryService } from "src/app/service/category.service";
import { Ibook } from "../interface/book";

@Component({
  selector: "app-books-by-cat",
  templateUrl: "./books-by-cat.component.html",
  styleUrls: ["./books-by-cat.component.css"],
})
export class BooksByCatComponent {
  categoryId!: any;
  books!: any[];

  constructor(
    private _BooksByCategory: CategoryService,
    private _Router: ActivatedRoute
  ) {}

  ngOnInit() {
    this._Router.paramMap.subscribe((id) => {
      this.categoryId = id.get("id");
    });

    this._BooksByCategory
      .getBooksByCategoryId(this.categoryId)
      .subscribe((data) => {
        console.log(data);
        this.books = data;
      });
  }
}
