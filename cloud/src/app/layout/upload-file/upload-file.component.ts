import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FileInfo } from 'src/app/models/FileInfo';
import { FileService } from 'src/app/services/file.service';
import { TokenDecoderService } from 'src/app/services/token-decoder.service';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit{
  uploadForm = new FormGroup({
    filename: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    tags: new FormControl('', [Validators.required, Validators.minLength(3)]),
    type: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    createdAt: new FormControl('', [Validators.required]),
    lastModifiedAt: new FormControl('', [Validators.required]),
  });
  fileInfo: FileInfo = {
    type: '',
    filename: '',
    description: '',
    createdAt: '',
    lastModifiedAt: '',
    size: '',
    tags: ''
  };
  file: string = '';
  loadedFile: any;
  constructor(
    private fileService: FileService, private tokenDecoderService: TokenDecoderService){

  }

  ngOnInit(): void {
  }

  upload():void{
     if(this.uploadForm.valid){
      alert("Successfully uploaded a file!");
    }
    this.fileInfo.description = this.uploadForm.value.description;
    this.fileInfo.tags = this.uploadForm.value.tags;
    this.fileService.uploadFile(this.fileInfo, this.loadedFile).subscribe(
      {
        next:(result) =>{
          console.log(result);

          this.fileService.uploadFileToDynamoDb(this.fileInfo).subscribe((result) =>{
            console.log(result);
          })
        },
        error:(error) =>{
          console.log(error);
          this.fileService.uploadFileToDynamoDb(this.fileInfo).subscribe((result) =>{
            console.log(result);
          })
        }
      }
    );

  }

  handleUpload(event):void{
    this.loadedFile = event.target.files[0];
    const newFilename = this.tokenDecoderService.getDecodedAccesToken()['username'] + '-'+this.loadedFile.name; // Specify the new filename
  
    // Create a new File object with the updated filename
    const modifiedFile = new File([this.loadedFile], newFilename, { type: this.loadedFile.type });
    this.loadedFile = modifiedFile;
    const reader = new FileReader();
    reader.readAsDataURL( this.loadedFile);
    reader.onload = () => {
        this.file = reader.result.toString();
    };
    const name =  this.loadedFile.name;
    const type =  this.loadedFile.type;
    const size = Number( this.loadedFile.size)/1024;
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
    this.fileInfo.filename = name;
    this.fileInfo.description = this.uploadForm.value.description;
    this.fileInfo.tags = this.uploadForm.value.tags;
    this.fileInfo.lastModifiedAt = formattedDate;
    this.fileInfo.createdAt = formattedDate;
    this.fileInfo.size = String(Math.round((size + Number.EPSILON) * 100) / 100);
    this.fileInfo.type = type;

  
  }
}
