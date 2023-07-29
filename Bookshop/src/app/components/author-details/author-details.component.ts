import { Component } from "@angular/core";
import { Iauthor } from "../interface/author";
import { AuthorService } from "src/app/service/authors/author.service";
import { ActivatedRoute } from "@angular/router";
import { Ibook } from "../interface/book";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-author-details",
  templateUrl: "./author-details.component.html",
  styleUrls: ["./author-details.component.css"],
  providers: [MessageService],

})
export class AuthorDetailsComponent {
  _id!: any;
  author!: any;
  selectedStatus!: string;
  book!: Ibook;
  rating: number = 3;
  starCount: number = 5;

  constructor(
    private _authorservice: AuthorService,
    private _Router: ActivatedRoute
  ) { }

  ngOnInit() {
    this._Router.paramMap.subscribe((id) => {
      this._id = id.get("id");
    });
    this._authorservice.getAuthorById(this._id).subscribe((author) => {
      console.log(author);
      this.author = author;
    });
  }

  onRatingChanged(rating: any) {
    console.log(rating);
    this.rating = rating;
  }
}
