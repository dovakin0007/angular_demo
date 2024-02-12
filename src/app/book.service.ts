import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl = 'http://localhost:8083/api/books';

  constructor(private http: HttpClient) { }

  deleteBook(bookId: string): Observable<any> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete<any>(url);
  }
}
