import { Component, OnInit } from '@angular/core';
// import { PostService } from '../post.service';
import { NgFor } from '@angular/common';
import {HttpClient} from "@angular/common/http"
import {Observable} from "rxjs";

interface Movie {
  name?: string;
  actor?: string;
  imageType?: string;
  base64String?: string;

}
@Component({
  selector: 'app-show-movies',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-movies.component.html',
  styleUrl: './show-movies.component.css'
})
export class ShowMoviesComponent {
  private getUrl = 'http://localhost:8080/api/movies'
  json_data:any = [];
  movie_data:any;
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
