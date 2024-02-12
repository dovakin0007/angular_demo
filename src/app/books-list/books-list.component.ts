import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { BooksService } from '../book.service';

interface book {
  _id?: any;
  name?: string;
  author?: string;
  imageType?: string;
  base64String?: string;
}
@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [NgFor,NgIf, RouterLink],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent {

  books: book[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    const apiUrl = 'http://localhost:8083/api/books';
    this.http.get<book[]>(apiUrl).subscribe(
      (data) => {
        console.log(data)
        this.books = data;
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  // updateBook(book: book): void {
  //   this.router.navigate(['/update-book']); 
  // }
  

  deleteBook(book: book): void {
    if (confirm('Are you sure you want to delete this book?')) {
      const apiUrl = `http://localhost:8083/api/books/${book.name}`;
      this.http.delete(apiUrl).subscribe(
        () => {
          // Remove the book from the list
          this.books = this.books.filter(m => m.name !== book.name);
          console.log('Book deleted successfully');
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }
}
