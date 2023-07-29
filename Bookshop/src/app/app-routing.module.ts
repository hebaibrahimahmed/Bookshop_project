import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuardGuard } from "./admin-guard.guard";
import { AuthGuard } from "./auth.guard";
import { AboutComponent } from "./components/about/about.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminAuthorComponent } from "./components/admin/author/author.component";
import { AdminBookComponent } from "./components/admin/book/book.component";
import { AdminCategoryComponent } from "./components/admin/category/category.component";
import { AdminHomeComponent } from "./components/admin/home/home.component";
import { AdminUserComponent } from "./components/admin/user/user.component";
import { AuthorDetailsComponent } from "./components/author-details/author-details.component";
import { AuthorsComponent } from "./components/authors/authors.component";
import { BookDetailsComponent } from "./components/book-details/book-details.component";
import { BooksByCatComponent } from "./components/books-by-cat/books-by-cat.component";
import { BooksComponent } from "./components/books/books.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegisterComponent } from "./components/register/register.component";
import { RouteGuard } from "./route.guard";

const routes: Routes = [
  { path: "", canActivate: [RouteGuard], component: HomeComponent, data: { state: '' } },
  { path: "books", canActivate: [RouteGuard], component: BooksComponent, data: { state: 'books' } },
  {
    path: "book-details/:id",
    canActivate: [RouteGuard],
    component: BookDetailsComponent,
    data: { state: 'book-details' }
  },
  { path: "authors", canActivate: [RouteGuard], component: AuthorsComponent, data: { state: 'authors' } },
  {
    path: "author/:id",
    canActivate: [RouteGuard],
    component: AuthorDetailsComponent,
    data: { state: 'author' }
  },
  {
    path: "categories",
    canActivate: [RouteGuard],
    component: CategoriesComponent,
    data: { state: 'categories' }

  },
  {
    path: "category/:id",
    canActivate: [RouteGuard],
    component: BooksByCatComponent,
    data: { state: 'category' }

  },
  { path: "aboutus", canActivate: [RouteGuard], component: AboutComponent, data: { state: 'aboutus' } },
  { path: "profile", canActivate: [AuthGuard], component: ProfileComponent, data: { state: 'profile' } },
  {
    path: "profile/:id",
    canActivate: [AuthGuard],
    component: ProfileComponent,
    data: { state: 'profile' }
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AdminGuardGuard],
    children: [
      {
        path: "category",
        canActivate: [AdminGuardGuard],
        component: AdminCategoryComponent,
        // data: { state: 'admin/category' }
      },
      {
        path: "home",
        canActivate: [AdminGuardGuard],
        component: AdminHomeComponent,
        // data: { state: 'admin/home' }
      },
      {
        path: "user",
        canActivate: [AdminGuardGuard],
        component: AdminUserComponent,
        // data: { state: 'admin/user' }
      },
      {
        path: "author",
        canActivate: [AdminGuardGuard],
        component: AdminAuthorComponent,
        // data: { state: 'admin/author' }
      },
      {
        path: "book",
        canActivate: [AdminGuardGuard],
        component: AdminBookComponent,
        // data: { state: 'admin/book' }
      },
    ],
  },
  {
    path: "register", component: RegisterComponent, data: { state: 'register' }
  },
  { path: "login", component: LoginComponent, data: { state: 'login' } },
  { path: "**", component: NotfoundComponent, data: { state: 'login' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
