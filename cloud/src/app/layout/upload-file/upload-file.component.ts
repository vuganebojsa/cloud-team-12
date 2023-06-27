import { Component, Input } from '@angular/core';
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
  @Input() folderName: string = '';

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
  base64File: string;
  constructor(
    private fileService: FileService, private tokenDecoderService: TokenDecoderService){

  }
  isFolderNameValid():boolean{
    return this.folderName !== '' && this.folderName !== null && this.folderName !== undefined;
  }

  upload(){
     if(!this.uploadForm.valid){
        return;
    }
    this.fileInfo.description = this.uploadForm.value.description;
    this.fileInfo.tags = this.uploadForm.value.tags;
    this.fileInfo.folderName = this.folderName;
    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result as string;
      this.base64File = btoa(fileContent);
      this.fileInfo.fileContent = this.base64File;
      if(this.fileInfo.folderName.endsWith('/')) this.fileInfo.folderName = this.fileInfo.folderName.slice(0, this.fileInfo.folderName.length - 1);
      console.log(this.fileInfo);
      this.fileService.addFileOverall(this.fileInfo).subscribe({
        next:(result) =>{
          
          alert('Successfully uploaded file with name: ' + this.fileInfo.filename);
        },
        error:(err) =>{
          if(err.status === 200){
            alert('Successfully uploaded file with name: ' + this.fileInfo.filename);
          }
        }
      })

    };

    reader.readAsBinaryString(this.loadedFile);

   

  }

  handleUpload(event):void{
    this.loadedFile = event.target.files[0];
    //const newFilename = this.tokenDecoderService.getDecodedAccesToken()['cognito:username'] + '-'+this.loadedFile.name; // Specify the new filename
  
    // Create a new File object with the updated filename
    const modifiedFile = new File([this.loadedFile], this.loadedFile.name, { type: this.loadedFile.type });
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
