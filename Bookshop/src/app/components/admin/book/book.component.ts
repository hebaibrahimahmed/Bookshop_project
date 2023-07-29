import { NONE_TYPE } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { AuthorService } from 'src/app/service/admin/author/author.service';
import { BookService } from 'src/app/service/admin/book/book.service';
import { CategoryService } from 'src/app/service/admin/category/category.service';
import { Ibook } from '../../interface/book';
import { User } from '../../interface/user';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [MessageService, ConfirmationService],

})
export class AdminBookComponent {

  books!: any[];
  categories!: any[];
  authors!: any[];
  bookDialog!: boolean;
  book!: any;
  selectedBooks: any[] = [];
  submitted!: boolean;
  statuses!: any[];
  selectedBook!: any;
  error!: string;
  category_id_from_html?: any;
  author_id_from_html?: any;
  selectedFile?: File;
  newBook: boolean = false;
  registerForm!: FormGroup;
  selectedAuthor?: string;
  selectedCategory?: string;
  constructor(
    private _BookService: BookService,
    private _CateService: CategoryService,
    private _AuthorService: AuthorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
    this._BookService.getAllBook().subscribe((book) => {
      console.log(book);
      this.books = book;
    });


    this._CateService.getAllCategory().subscribe((cate) => {
      console.log(cate);
      this.categories = cate;
    });

    this._AuthorService.getAllAuthor().subscribe((author) => {
      console.log(author);
      this.authors = author;
    });
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        category_id: ["", Validators.required],
        author_id: ["", Validators.required],
        image_url: [""],
        price: [""]
      }
    )
  }

  selectAuthor(event: any) {
    this.author_id_from_html = { _id: event.target.value };
    this.book.author_id = this.author_id_from_html
  }

  selectCategory(event: any) {
    this.category_id_from_html = { _id: event.target.value };
    this.book.category_id = this.category_id_from_html
  }

  openNew() {
    this.newBook = true;
    this.book = {
      name: "",
      image_url: "",
      category_id: "",
      author_id: "",
      price: "",
      book_description: ""
    };
    this.selectedAuthor = "";
    this.selectedCategory = "";
    this.submitted = false;
    this.newBook = true;
    this.bookDialog = true;
  }

  editBook(book: any) {
    this.book = { ...book };
    this.bookDialog = true;
  }

  deleteBook(book: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + book.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this._BookService.deleteBook(book._id).subscribe({
          next: () => {
            this._BookService.getAllBook().subscribe((book) => {
              this.books = book;
            });
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Book Deleted",
              life: 3000,
            });
          },
          error: (err) => {
            this.error = err.error.Message;
            this.messageService.add({
              severity: "error",
              summary: "Book",
              detail: `${err.error.Message}`,
              life: 3000,
            });
          },
        });

      },
    });
  }

  hideDialog() {
    this.bookDialog = false;
    this.submitted = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(file.name)) {
      this.messageService.add({
        severity: "error",
        summary: "book",
        detail: "Invalid file type. Please select a JPEG, PNG, or JPG file.",
        life: 3000,
      });
      this.selectedFile = undefined; // Clear the selected file
      event.target.value = null; // Clear the input element
      return;
    }
    // Do something with the valid file
    this.selectedFile = event.target.files[0];
  }

  saveBook() {
    this.submitted = true;

    if ((this.book?.name).trim()) {

      const formData = new FormData();
      formData.append("name", this.book.name);
      formData.append("category_id", this.book.category_id._id);
      formData.append("author_id", this.book.author_id._id);
      formData.append("price", this.book.price);
      if (this.selectedFile) {
        formData.append("image_url", this.selectedFile, this.selectedFile.name);
      }

      if (this.book._id) {
        this.books[this.findIndexById(this.book?._id)] = this.book;

        this._BookService
          .updateBook(formData, this.book._id)
          .subscribe({
            next: () => {
              this._BookService.getAllBook().subscribe((book) => {
                this.books = book;
              });
              this.messageService.add({
                severity: "success",
                summary: "Successful",
                detail: "Book Updated",
                life: 3000,
              });
            },
            error: (err) => {
              console.log(err);
              this.messageService.add({
                severity: "error",
                summary: "book",
                detail: "Couldn't update book",
                life: 3000,
              });
            }
          });
      } else {
        this._BookService.addBook(formData).subscribe({
          next: () => {
            this._BookService.getAllBook().subscribe((book) => {
              this.books = book;
            });
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Book Added",
              life: 3000,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: "error",
              summary: "book",
              detail: `${err.error.Message}`,
              life: 3000,
            });
          }
        })
      }
    }

    this.books = [...this.books];
    this.book = {
      name: "",
      image_url: "",
      category_id: "",
      author_id: "",
      price: "",
      book_description: ""
    };
    this.selectedAuthor = "";
    this.selectedCategory = "";
    this.bookDialog = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
