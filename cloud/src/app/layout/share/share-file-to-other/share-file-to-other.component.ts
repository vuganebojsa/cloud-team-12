import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileInfo } from 'src/app/models/FileInfo';
import { FolderInfo } from 'src/app/models/Folder';
import { SharedFile } from 'src/app/models/SharedFile';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-share-file-to-other',
  templateUrl: './share-file-to-other.component.html',
  styleUrls: ['./share-file-to-other.component.css']
})
export class ShareFileToOtherComponent {
  uploadForm = new FormGroup({
    path: new FormControl('', [Validators.required, Validators.minLength(3)]),
    receiver: new FormControl('', [Validators.required, Validators.minLength(3)]),

  });

  folders: FolderInfo[];
  files: FileInfo[];
  isLoaded = false;
  isLoadedFolder = false;


  constructor(
    private fileService: FileService){

  }


  ngOnInit(): void {
    this.fileService.getFiles().subscribe({
      next:(res) =>{
          this.files = res;
          this.isLoaded = true;

      },
      error:(err) =>{

      }
    })

    this.fileService.getFolders().subscribe({
      next:(res) =>{
        this.folders = res;
        for(let f of this.folders){
          f.foldername = f.path + f.foldername;
        }
        this.isLoadedFolder = true;

      },
      error:(err) =>{
        
      }
    })
  }
  shareFile(file: FileInfo):void{
    let new_foldername = ''
    if(file.folderName !== ''){
      new_foldername = file.folderName + '/' + file.filename;
    }
    this.uploadForm.get('path').setValue(new_foldername);

  }
  shareFolder(folder:FolderInfo):void{

    this.uploadForm.get('path').setValue(folder.foldername);

  }
  share():void{
    if(!this.uploadForm.valid){
      alert('Please fullfill both fields.')
      return;
    }
    let sharedFile: SharedFile = {
      giver:'',
      receiver: this.uploadForm.value.receiver,
      path:this.uploadForm.value.path
    }
    this.fileService.shareFile(sharedFile).subscribe({
      next:(result) =>{
        alert('Successfully shared file');
      },
      error:(erro) =>{
        if(erro.status===0){
          alert('Successfully shared file');

        }
        else alert('Something went wrong.');
      }
    })
  }
}
