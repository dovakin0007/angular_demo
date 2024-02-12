import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

interface newBooks {
  name?: any,
  author?: any,
  imageType?: string;
  base64String?: string;
}

@Component({
  selector: 'app-add-books',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-books.component.html',
  styleUrl: './add-books.component.css'
})
export class AddBooksComponent {
  

  myForm = this.formBuilder.group({
    Name: new FormControl(''),
    Author: new FormControl('')
  });
  
  imageUploadModel: newBooks = {}; 

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  
  validFile: boolean | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  private postUrl = 'http://localhost:8083/api/books';
  
  onFileChanged(event: any) {
    // Extract the file from the event
    const file = event.target.files[0];
    // Check the file is image or not
    if (file.type.split('/')[0] !== 'image') {
        this.validFile = false;
    } else {
        this.validFile = true;
        // Extract the image type from the file
        this.imageUploadModel.imageType = file.type.split('/')[1];
        
        // Create a FileReader object to read the file
        const myReader: FileReader = new FileReader();  
        // Define an event handler for when the file reading is completed
        myReader.onloadend = (e) => {
            // Check if the result is available
            if (myReader.result) {
                // convert the result to a base64 string 
                this.imageUploadModel.base64String = myReader.result.toString();
            }
        };
        myReader.readAsDataURL(file);
    }
}


  onSubmit(): void {
    let formData: newBooks = {
      name: this.myForm.value.Name,
      author: this.myForm.value.Author,
      imageType: this.imageUploadModel.imageType,
      base64String: this.imageUploadModel.base64String
    };

    const body = JSON.stringify(formData);
    console.log(body);
    this.http.post(this.postUrl, body, { headers: this.header }).subscribe(body => {
      window.alert('Book added successfully!');
      console.log(body);
    });
    this.myForm.reset();
  }
}

