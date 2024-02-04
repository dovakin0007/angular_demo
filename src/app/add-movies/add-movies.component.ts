import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

interface newMovies {
  name?: any,
  actor?: any,
  imageType?: string;
  base64String?: string;
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
    Name: new FormControl(''),
    Actor: new FormControl('')
  });
  
  imageUploadModel: newMovies = {}; // Define imageUploadModel

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  
  validFile: boolean | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  private postUrl = 'http://localhost:8080/api/movies';
  
  onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      this.validFile = false;
    } else {
      this.validFile = true;
      this.imageUploadModel.imageType = file.type.split('/')[1];
      
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        if (myReader.result) {
        this.imageUploadModel.base64String = myReader.result.toString();
      }
    };
      myReader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    let formData: newMovies = {
      name: this.myForm.value.Name,
      actor: this.myForm.value.Actor,
      imageType: this.imageUploadModel.imageType,
      base64String: this.imageUploadModel.base64String
    };

    const body = JSON.stringify(formData);
    console.log(body);
    

    
    this.http.post(this.postUrl, body, { headers: this.header }).subscribe(body => {
      console.log(body);
    });
    this.myForm.reset();
  }
}