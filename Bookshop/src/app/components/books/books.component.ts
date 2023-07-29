import { Component, Input } from "@angular/core";
import { BooksService } from "./../../service/books/books.service";
import { Ibook } from "./../interface/book";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent {
  searchTerm = "";
  books!: Ibook[];
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];
  constructor(private _BooksService: BooksService) {
    this.currentPage = 1;
    this.pageSize = 21;
    this.totalPages = 6;
    this.pages = [];
  }

  ngOnInit() {
    this._BooksService.getAllBooks().subscribe({
      next: (book) => {
        this.books = book;
        this.calculatePages();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  scrollToTop() { }
  onWindowScroll() { }
  calculatePages() {
    console.log(this.books.length);
    console.log(this.pageSize);

    this.totalPages = Math.ceil(this.books.length / this.pageSize);
    console.log(this.totalPages);

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }


}
