import { NgModule, Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from "./components/register/register.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { AboutComponent } from "./components/about/about.component";
import { BooksComponent } from "./components/books/books.component";
import { AuthorsComponent } from "./components/authors/authors.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { UsersidebarComponent } from "./components/usersidebar/usersidebar.component";
import { BooksByCatComponent } from "./components/books-by-cat/books-by-cat.component";
import { BookDetailsComponent } from "./components/book-details/book-details.component";
import { StarRatingComponent } from "./components/stars-rating/stars-rating.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AuthorDetailsComponent } from "./components/author-details/author-details.component";
import { AdminCategoryComponent } from "./components/admin/category/category.component";
import { AdminBookComponent } from "./components/admin/book/book.component";
import { AdminAuthorComponent } from "./components/admin/author/author.component";
import { AdminUserComponent } from "./components/admin/user/user.component";
import { ScrollToTopButtonComponent } from "./components/scroll-to-top-button/scroll-to-top-button.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatListModule } from "@angular/material/list";
import { AdminComponent } from "./components/admin/admin.component";
import { AccordionModule } from "primeng/accordion"; //accordion and accordion tab
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { FileUploadModule } from "primeng/fileupload";
import { MatRadioModule } from "@angular/material/radio";
import { InputTextModule } from "primeng/inputtext";
import { RadioButtonModule } from "primeng/radiobutton";
import { RippleModule } from "primeng/ripple";
import { RatingModule } from "primeng/rating";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Cat_Filter } from "./components/categories/catePipe";
import { Book_Filter } from "./components/books/bookPipe";
import { Author_Filter } from "./components/authors/authorPipe";
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NotfoundComponent,
    AboutComponent,
    BooksComponent,
    AuthorsComponent,
    CategoriesComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    UsersidebarComponent,
    BooksByCatComponent,
    BookDetailsComponent,
    StarRatingComponent,
    AuthorDetailsComponent,
    AdminCategoryComponent,
    AdminBookComponent,
    AdminAuthorComponent,
    AdminUserComponent,
    ScrollToTopButtonComponent,
    SidenavComponent,
    AdminComponent,
    Cat_Filter,
    Book_Filter,
    Author_Filter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    AccordionModule,
    ConfirmDialogModule,
    DialogModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    MatRadioModule,
    InputTextModule,
    RadioButtonModule,
    RippleModule,
    RatingModule,
    MatProgressBarModule,
    MatSelectModule,
    MatButtonToggleModule,
    CheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
