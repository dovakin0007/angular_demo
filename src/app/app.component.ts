import { Component , OnInit} from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { PostService } from './post.service';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my_app';
  posts:any;

  constructor(private service:PostService) {}

  ngOnInit(){
    this.service.getPosts().subscribe(response => {
      this.posts = response
    })
  }

}
