import { Component } from '@angular/core';
import { Iauthor } from '../interface/author';
import { AuthorService } from 'src/app/service/authors/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {

  authors!: Iauthor[]
  searchTerm = "";
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];

  constructor(private _AuthorService: AuthorService) {
    this.currentPage = 1;
    this.pageSize = 8;
    this.totalPages = 1;
    this.pages = [];
  }
  ngOnInit() {
    this._AuthorService.getAllauthors().subscribe((author) => {
      this.authors = author;
      this.calculatePages();
    })
  }

  scrollToTop() { }
  onWindowScroll() { }
  calculatePages() {
    console.log(this.authors.length);
    console.log(this.pageSize);

    this.totalPages = Math.ceil(this.authors.length / this.pageSize);
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
