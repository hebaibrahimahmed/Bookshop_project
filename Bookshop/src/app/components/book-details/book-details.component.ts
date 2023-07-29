import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthService } from "src/app/service/authentication/auth.service";
import { BooksService } from "src/app/service/books/books.service";
import { Ibook } from "../interface/book";
import { bookReview } from "../interface/bookReview";
import { StarRatingColor } from "../stars-rating/stars-rating.component";

@Component({
  selector: "app-book-details",
  templateUrl: "./book-details.component.html",
  styleUrls: ["./book-details.component.css"],
  providers: [MessageService, ConfirmationService],


})
export class BookDetailsComponent {
  error?: string;
  user!: any;
  haveTheBook: boolean = false;
  added: boolean = false;
  book_id!: any;
  book!: any;
  isLogged?: boolean;
  reviews: any[] = [];
  rating: any = 0;
  starCount: number = 5;
  avgRate!: number;
  visible!: boolean;
  showReviewForUpdate!: boolean;
  txtareavalue!: any;
  review_id_for_operation?: string;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  constructor(
    private _BookService: BooksService,
    private _Router: ActivatedRoute,
    private _UserService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this._UserService.currentLogUser.subscribe((user) => {
      this.user = user;
    });
    if (this.user.email != "") {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  ngOnInit() {
    this._Router.paramMap.subscribe((id) => {
      this.book_id = id.get("id");
    });

    this._BookService.getBookById(this.book_id).subscribe((book) => {
      this.book = book;
      this.avgRate = this.book;
    });

    if (this.isLogged) {
      this._BookService
        .getBookRate(this.book_id, this.user.user_id)
        .subscribe((response) => {
          this.rating = response.rate.rate;
        });
    }

    this._BookService.getAllReviewForSpecificBook(this.book_id).subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (err) => {
        // this.error = err.error.Message;
        // this.messageService.add({
        //   severity: "error",
        //   summary: "Reviews",
        //   detail: "No Reviews Found",
        //   life: 3000,
        // });
      },
    });
  }

  showDialog() {
    this.visible = true;
  }

  onRatingChanged(rating: any) {
    if (rating === null) {
      rating = 0;
    }
    const rate = { rate: rating };
    this.rating = rating;
    console.log(rate);


    this._BookService
      .updateBook(rate, this.book_id)
      .subscribe({
        next: (response) => {
          this.rating = response.rate;
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Rating updated",
            life: 3000,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: "errpr",
            summary: "error",
            detail: `${err.error.Message}`,
            life: 3000,
          })
        }
      });

    this._BookService.getBookById(this.book_id).subscribe((book) => {
      this.book = book;
      this.avgRate = this.book;
    });
  }

  changeStatus(newStatus: string) {
    const book_status = { book_status: newStatus };
    this._BookService
      .updateBook(book_status, this.book_id)
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: "success",
            summary: "Status",
            detail: "Status updated",
            life: 3000,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: "error",
            summary: "Status",
            detail: `${err.error.Message}`,
            life: 3000,
          });
        }
      });
  }

  changeReview(newReview: any) {
    if (this.isLogged == true) {

      const review = {
        review: newReview.value,
        user_id: {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          image_url: this.user.image_url,
        },
      };

      this.reviews.push(review);

      this._BookService
        .addReviewText(review, this.book_id, this.user.user_id)
        .subscribe({
          next: (response: any) => {
            this.reviews = response.review

            this.messageService.add({
              severity: "success",
              summary: "Review",
              detail: "Review Added Successfully",
              life: 3000,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: "error",
              summary: "Review",
              detail: `${err.error.Message}`,
              life: 3000,
            });
            this.haveTheBook = true;
            // this.error = err.error.Message;
          },
        });
      this.visible = false;
    } else {
      this.added = true;
      this.messageService.add({
        severity: "error",
        summary: "Review",
        detail: `You have to login first`,
        life: 3000,
      });
      this.visible = false;
    }
    newReview.value = "";

  }

  addReview() { // add book to shelf
    if (this.isLogged == true) {
      this._BookService.addBookReview(this.book_id).subscribe({
        next: (book) => {
          this.messageService.add({
            severity: "success",
            summary: "Book",
            detail: `Book Added To Shelf`,
            life: 3000,
          });
        },
        error: (err) => {
          // this.haveTheBook = true;
          this.messageService.add({
            severity: "error",
            summary: "Book",
            detail: `${err.error.Message}`,
            life: 3000,
          });
          // this.error = err.error.Message;
        },
      });
      this.visible = false;
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Book",
        detail: `You have to login first`,
        life: 3000,
      });
      this.visible = false;
    }
  }

  onDeleteReviewText(review_id: any) {
    console.log(review_id);

    this.confirmationService.confirm({
      message: "Are you sure you want to delete ?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this._BookService.deleteReviewText(review_id, this.book_id).subscribe({
          next: (newreview) => {

            this.reviews = newreview.review;

            this.messageService.add({
              severity: "success",
              summary: "Review",
              detail: `Review Delete`,
              life: 3000,
            });
            // this._BookService.getAllReviewForSpecificBook(this.book_id).subscribe({
            //   next: (reviews) => {
            //     this.reviews = reviews;
            //   },
            //   error: (err) => {
            //     this.messageService.add({
            //       severity: "error",
            //       summary: "Review",
            //       detail: `Couldn't Retreive Old Reviews --> ${err.error.Message}`,
            //       life: 3000,
            //     });
            //   },
            // });
          },
          error: (err) => {
            this.messageService.add({
              severity: "error",
              summary: "Review",
              detail: `Couldn't Delete Review --> ${err.error.Message}`,
              life: 3000,
            });
          }
        })
      }
    });

  }

  onUpdateReviewText(review_id: any) {
    console.log(review_id);
    this.review_id_for_operation = review_id;

    this.showReviewForUpdate = true;
  }

  updateReview(newReview: any) {
    const newRev = { review: newReview.value };

    this._BookService.updateReviewText(newRev, this.review_id_for_operation).subscribe({
      next: (review) => {
        this.messageService.add({
          severity: "success",
          summary: "Review",
          detail: `Review Updated`,
          life: 3000,
        });
        this.showReviewForUpdate = false;
        this._BookService.getAllReviewForSpecificBook(this.book_id).subscribe({
          next: (reviews) => {
            this.reviews = reviews;
          },
          error: (err) => {
            this.messageService.add({
              severity: "error",
              summary: "Review",
              detail: `${err.error.Message}`,
              life: 3000,
            });
          },
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Review",
          detail: `${err.error.Message}`,
          life: 3000,
        });
        this.showReviewForUpdate = false;
      }
    })
    newReview.value = ""
  }
}
