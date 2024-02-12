import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {routes} from './app.routes'
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import { ShowBooksComponent } from './show-books/show-books.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksService } from './book.service';


const appRoutes: Routes = routes;

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule ,
    CommonModule,
    RouterModule.forRoot(
        appRoutes)
  ],
  declarations: [
    AppComponent,
    ShowBooksComponent, 
    AddBooksComponent, 
    BooksListComponent,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}