import { Component, OnInit } from "@angular/core";
import { Iauthor } from "../../interface/author";
import { AuthorService } from "src/app/service/admin/author/author.service";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-author",
  templateUrl: "./author.component.html",
  styleUrls: ["./author.component.css"],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AdminAuthorComponent {
  authors!: any[];
  authorDialog!: boolean;
  author!: any;
  selectedAuthors: any[] = [];
  submitted!: boolean;
  statuses!: any[];
  selectedAuthor!: any;
  error!: string;
  selectedFile?: File;
  registerForm!: FormGroup;
  constructor(
    private _AuthorService: AuthorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this._AuthorService.getAllAuthor().subscribe((author) => {
      console.log(author);
      this.authors = author;
    });
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        date_of_birth: [""],
        author_info: [""],
        image_url: [""],
      },
    );
  }

  openNew() {
    this.author = {
      _id: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      image_url: "",
      author_info: "",
    };
    this.submitted = false;
    this.authorDialog = true;
  }

  editAuthor(author: Iauthor) {
    this.author = { ...author };
    this.authorDialog = true;
  }

  deleteAuthor(author: Iauthor) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + author.first_name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this._AuthorService.deleteAuthor(author._id).subscribe({
          next: (response: any) => {
            this._AuthorService.getAllAuthor().subscribe((author) => {
              this.authors = author;
            })
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Author Deleted",
              life: 3000,
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: "error",
              summary: "Author",
              detail: `${err.error.Message}`,
              life: 3000,
            });
          },
        });
      },
    });
  }

  hideDialog() {
    this.authorDialog = false;
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

  get f() {
    return this.registerForm.controls;
  }

  saveAuthor() {
    this.submitted = true;

    if (this.author.first_name.trim()) {

      const formData = new FormData();
      formData.append("first_name", this.f["first_name"].value);
      formData.append("last_name", this.f["last_name"].value);
      formData.append("date_of_birth", this.f["date_of_birth"].value);
      formData.append("author_info", this.f["author_info"].value);

      if (this.selectedFile) {
        formData.append("image_url", this.selectedFile, this.selectedFile.name);
      }

      if (this.author._id) {
        this.authors[this.findIndexById(this.author._id)] = this.author;

        this._AuthorService
          .updateAuthor(formData, this.author._id)
          .subscribe({
            next: () => {
              this._AuthorService.getAllAuthor().subscribe((author) => {
                this.authors = author;
              })
              this.messageService.add({
                severity: "success",
                summary: "Successful",
                detail: "Author Updated",
                life: 3000,
              });
            },
            error: (err) => {

              this.messageService.add({
                severity: "error",
                summary: "Author",
                detail: `${err.error.Message}`,
                life: 3000,
              });
            }
          });

      } else {
        this._AuthorService
          .addAuthor(formData)
          .subscribe({
            next: () => {
              this._AuthorService.getAllAuthor().subscribe((author) => {
                this.authors = author;
              })
              this.messageService.add({
                severity: "success",
                summary: "Successful",
                detail: "Author Added",
                life: 3000,
              });
            },
            error: (err) => {
              this.messageService.add({
                severity: "error",
                summary: "Author",
                detail: `${err.error.Message}`,
                life: 3000,
              });
            }
          });

      }

      this.authors = [...this.authors];
      this.authorDialog = false;
      this.author = {
        _id: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        image_url: "",
        author_info: "",
      };
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.authors.length; i++) {
      if (this.authors[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
