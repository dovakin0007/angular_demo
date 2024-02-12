import { Component } from '@angular/core';
import { NgFor} from '@angular/common';
import {HttpClient} from "@angular/common/http";

interface books {
  name?: string;
  author?: string;
  imageType?: string;
  base64String?: string;

}
@Component({
  selector: 'app-show-books',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-books.component.html',
  styleUrl: './show-books.component.css'
})
export class ShowBooksComponent {

  private getUrl = 'http://localhost:8083/api/books'
  json_data:any = [];
  book_data:any;
  constructor (private http:HttpClient) {
  }
showConfig() {
  this.http.get(this.getUrl).subscribe((data) =>{
    this.json_data = data;
    console.log(this.json_data);
   }
  );
}
ngOnInit() {
  this.showConfig()
}
}
