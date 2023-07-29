import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "src/app/service/category.service";
import { ICategory } from "../interface/category";
import { trigger, transition, style, animate } from "@angular/animations";
@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
  animations: [
    trigger("fade", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("300ms", style({ opacity: 0 }))]),
    ]),
  ],
})
export class CategoriesComponent implements OnInit {
  searchTerm = "";
  categories!: ICategory[];
  categoryId!: string;
  books: any;
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute
  ) {
    this.currentPage = 1;
    this.pageSize = 21;
    this.totalPages = 6;
    this.pages = [];
  }

  ngOnInit() {
    this._categoryService.getAllCategory().subscribe((category) => {
      this.categories = category;
      this.calculatePages();
    });
  }

  scrollToTop() { }
  onWindowScroll() { }
  calculatePages() {
    console.log(this.categories.length);
    console.log(this.pageSize);

    this.totalPages = Math.ceil(this.categories.length / this.pageSize);
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
