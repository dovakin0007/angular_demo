import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowBooksComponent } from './show-books/show-books.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { BooksListComponent } from './books-list/books-list.component';
import { UpdateBookComponent } from './update-book/update-book.component';
export const routes: Routes = [
  { path: '', component: ShowBooksComponent },
  { path: 'home', component: ShowBooksComponent },
  { path: 'add', component: AddBooksComponent },
  { path: 'list', component: BooksListComponent },
  { path: 'update-book/:name', component: UpdateBookComponent } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
