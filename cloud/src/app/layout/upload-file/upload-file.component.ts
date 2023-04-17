import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  uploadForm = new FormGroup({
    filename: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    tags: new FormControl('', [Validators.required, Validators.minLength(3)]),
    type: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    createdAt: new FormControl('', [Validators.required]),
    lastModifiedAt: new FormControl('', [Validators.required]),
  });

  file: string = '';
  constructor( private userService: UserService, private router: Router){

  }


  upload():void{
     if(this.uploadForm.valid){
      alert("Successfully uploaded a file!");
    }

  }

  handleUpload(event):void{
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.file = reader.result.toString();
    };
    const name = file.name;
    const type = file.type;
    const size = Number(file.size)/1024;
    //const modifiedAt = file.lastModifiedDate;
    //const createdAt = null;
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false 
    };
    const formattedDate = date.toLocaleString('en-US', options);
    this.uploadForm.setValue({
      filename: name,
      description: this.uploadForm.value.description,
      tags: this.uploadForm.value.tags,
      lastModifiedAt: formattedDate,
      size: String(Math.round((size + Number.EPSILON) * 100) / 100
      ),
      type : type,
      createdAt: formattedDate
    });

    

  }
}
