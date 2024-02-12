// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { NgFor} from '@angular/common';

// @Component({
//   selector: 'app-update-book',
//   standalone: true,
//   imports: [NgFor,ReactiveFormsModule, FormGroup],
//   templateUrl: './update-book.component.html',
//   styleUrl: './update-book.component.css'
// })
// export class UpdateBookComponent {

//   bookName!: string;
//   bookForm!: FormGroup;

//   constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.bookName = params['name'];
//       this.fetchMovie();
//     });

//     this.bookForm = this.fb.group({
//       name: [''],
//       author: ['']
//     });
//   }

//   fetchMovie(): void {
//     const apiUrl = `http://localhost:8083/api/books/${this.bookName}`;
//     this.http.get(apiUrl).subscribe(
//       (data: any) => {
//         this.bookForm.patchValue({
//           name: data.name,
//           author: data.author
//         });
//       },
//       (error) => {
//         console.error('Error fetching book:', error);
//       }
//     );
//   }

//   updateBook(): void {
//     const apiUrl = `http://localhost:8083/api/books/${this.bookName}`;
//     const formData = this.bookForm.value;
//     this.http.put(apiUrl, formData).subscribe(
//       () => {
//         console.log('Book updated successfully');        
//         this.router.navigate(['/books-list']);
//       },
//       (error) => {
//         console.error('Error updating book:', error);
//       }
//     );
//   }
// }

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent {
    

  myForm = this.formBuilder.group({
    Name: new FormControl(''),
    Author: new FormControl('')
  });
  
  imageUploadModel: newBooks = {};
  private postUrl = 'http://localhost:8083/api/books/';
  header = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  
  validFile: boolean | undefined;
  bookName!: string
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookName = params['name'];
      console.log(this.bookName)
      console.log(this.postUrl + this.bookName);
    })
  }

  

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
    console.log(this.postUrl + this.bookName)
    this.http.put(this.postUrl + this.bookName, body, { headers: this.header }).subscribe(body => {
      window.alert('Book added successfully!');
      console.log(body);
    });
    this.myForm.reset();
  }
}







