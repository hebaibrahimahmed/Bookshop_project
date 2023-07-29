import { Component, OnInit } from '@angular/core';
import { Ibook } from '../interface/book';
import { BooksService } from '../../service/books/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books: Ibook[] = [];
  popularBooks: Ibook[] = [];
  // Define an array of images
  images = [
    '../../../assets/slider1.jpg',
    '../../../assets/slider2.jpg'
  ];

  // Initialize the index of the current image
  currentImageIndex = 0;

  constructor(private _BooksService: BooksService) { }

  ngOnInit(): void {
    // Call the changeImage method every 5 seconds
    setInterval(() => {
      this.changeImage(1);
    }, 5000);
    this._BooksService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (err) => {
        console.log(err);
      },
    });

    // this._BooksService. -------------------KONT B7AWL AGEB AL POPULAR BOOKS----------------------------FINALLY GBTHA
    this._BooksService.popularBooks().subscribe({
      next: (books) => {
        console.log(books);

        this.popularBooks = books;
      }
    })
  }

  // Method to change the current image
  changeImage(direction: number): void {
    // Update the index of the current image based on the direction
    this.currentImageIndex += direction;
    // If the index exceeds the number of images, reset it to 0
    if (this.currentImageIndex === this.images.length) {
      this.currentImageIndex = 0;
    } else if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.images.length - 1;
    }
  }

  // Method to navigate to the next image
  nextImage(): void {
    this.changeImage(1);
  }

  // Method to navigate to the previous image
  previousImage(): void {
    this.changeImage(-1);
  }
}
