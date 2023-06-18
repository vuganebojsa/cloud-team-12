import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileInfo } from 'src/app/models/FileInfo';
import { FolderInfo } from 'src/app/models/Folder';
import { SharedFile } from 'src/app/models/SharedFile';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-move-content',
  templateUrl: './move-content.component.html',
  styleUrls: ['./move-content.component.css']
})
export class MoveContentComponent {


  uploadForm = new FormGroup({
    path: new FormControl('', [Validators.required, Validators.minLength(3)]),
    receiver: new FormControl('', [Validators.required, Validators.minLength(3)]),

  });

  folders: FolderInfo[];
  files: FileInfo[];
  selectedFile: FileInfo;
  selectedFolder: FolderInfo;
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
    console.log(file)
    this.selectedFile = file;
    let new_foldername = ''
    if(file.folderName !== ''){
      new_foldername = file.folderName + '/' + file.filename;
    }else{
      new_foldername = file.filename.split('-')[1];

    }
    this.uploadForm.get('path').setValue(new_foldername);

  }
  shareFolder(folder:FolderInfo):void{
    this.selectedFolder = folder;
    this.uploadForm.get('receiver').setValue(folder.foldername);

  }
  move():void{
    if(!this.uploadForm.valid){
      alert('Please fullfill both fields.')
      return;
    }

    this.selectedFile.newPathName = this.selectedFolder.path + this.selectedFolder.foldername;
    this.fileService.moveFile(this.selectedFile).subscribe({
      next:(result) =>{
        alert('Successfully moved file');
      },
      error:(erro) =>{
        if(erro.status===200){
          alert('Successfully moved file');

        }
        else alert('Something went wrong.');
      }
    })
  }
}
