import { Component } from "@angular/core";
import { UserService } from "src/app/service/admin/user/user.service";
import { User } from "../../interface/user";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { MenuItem } from "primeng/api"; //api
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
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
export class AdminUserComponent {
  users!: User[];
  userDialog!: boolean;
  user!: User;
  selectedUsers: User[] = [];
  submitted!: boolean;
  statuses!: any[];
  selectedUser!: User;
  error!: string;
  selectedFile?: File;
  registerForm!: FormGroup;
  passwd!: string;
  show: boolean = false;
  constructor(
    private _UserService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.passwd = "password";
    this.buildForm();
    this._UserService.getAllUser().subscribe((user) => {
      console.log(user);
      this.users = user;
    });
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email: [
          "",
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
            ),
          ],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
            ),
          ],
        ],
        address: [""],
        gender: [""],
        image_url: [""],
        is_admin: [""],
        birth_date: [""],
      },
    );
  }

  openNew() {
    this.user = {
      user_id: "",
      first_name: "",
      last_name: "",
      birth_date: new Date(),
      email: "",
      address: "",
      password: "",
      gender: "",
      image_url: "",
      is_admin: false,
    };
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: any) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteUser(user: any) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + user.first_name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this._UserService.deleteUser(user._id).subscribe({
          next: (response) => {
            this.users = response.users;
          },
          error: (err) => {
            // console.log(err);
            this.error = err.error.Message;
          },
        });
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "User Deleted",
          life: 3000,
        });
      },
      reject: () => {
        console.log("rejected");
      },
    });
  }

  hideDialog() {
    this.userDialog = false;
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

  saveUser() {

    this.submitted = true;

    if ((this.user.first_name + this.user.last_name).trim()) {
      const formData = new FormData();

      formData.append("first_name", this.f["first_name"].value);
      formData.append("last_name", this.f["last_name"].value);
      formData.append("email", this.f["email"].value);
      // formData.append("password", this.f["password"].value);
      formData.append("gender", this.f["gender"].value);
      formData.append("address", this.f["address"].value);
      formData.append("birth_date", this.f["birth_date"].value);
      formData.append("is_admin", this.f["is_admin"].value);

      if (this.selectedFile) {
        formData.append("image_url", this.selectedFile, this.selectedFile.name);
      }

      if (this.user._id) {
        this.users[this.findIndexById(this.user._id)] = this.user;

        this._UserService
          .updateUser(formData, this.user._id)
          .subscribe({
            next: () => {
              this._UserService.getAllUser().subscribe((user) => {
                this.users = user;
              })
              this
              this.messageService.add({
                severity: "success",
                summary: "Successful",
                detail: "User Updated",
                life: 3000,
              });
            }
          });
      } else {
        this._UserService.addUser(formData).subscribe({
          next: () => {
            this._UserService.getAllUser().subscribe((user) => {
              this.users = user;
            })
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "User Added",
              life: 3000,
            });
          },
          error: (err) => {
            console.log(err);
          }
        })
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {
        _id: "",
        user_id: "",
        first_name: "",
        last_name: "",
        birth_date: new Date(),
        email: "",
        address: "",
        password: "",
        gender: "",
        image_url: "",
        is_admin: false,
      };
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  onClick() {
    if (this.passwd === "password") {
      this.passwd = "text";
      this.show = true;
    } else {
      this.passwd = "password";
      this.show = false;
    }
  }
}
