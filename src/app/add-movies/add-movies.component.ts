import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';


interface newMovies{
  name?: any,
  actor?: any
}

@Component({
  selector: 'app-add-movies',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-movies.component.html',
  styleUrl: './add-movies.component.css'
})


export class AddMoviesComponent {

  myForm = this.formBuilder.group({
    Name:new FormControl(''),
    Actor: new FormControl('')
  });
  header = new HttpHeaders({
    'Content-Type' :'application/json'
  })
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ){
  }

  private postUrl = 'http://localhost:8080/api/movies'
  

  onSubmit(): void{
    let formData: newMovies = {
      name: this.myForm.value.Name,
      actor: this.myForm.value.Actor

    }
    const body = JSON.stringify(formData);
    console.log(body);
    console.log(this.myForm.value);
    this.myForm.reset();
    this.http.post(this.postUrl, body, {headers: this.header}).subscribe(data => {
      console.log(data);
    })
  }
}
