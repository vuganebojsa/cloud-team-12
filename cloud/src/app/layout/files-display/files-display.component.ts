import { Component, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/models/FileInfo';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-files-display',
  templateUrl: './files-display.component.html',
  styleUrls: ['./files-display.component.css']
})
export class FilesDisplayComponent implements OnInit{
  
  isLoaded = false;
  allFiles: FileInfo[];
  currentFiles=  new Array();
  currentFolder = '';
  currentFolders = new Set();
  currentLevel = 0;
  ngOnInit(): void {
    this.fileService.getFiles().subscribe({
      next:(result) =>{
          this.allFiles = result;
          this.isLoaded = true;
          for(let f of this.allFiles){
            if(f.folderName !== ''){
              this.currentFolders.add(f.folderName.split('/')[0].toString());
            }
          }
          for(let f of this.allFiles){
            if(f.folderName === ''){
              this.currentFiles.push(f);

            }
          }
          console.log(this.currentFolders);
      },
      error:(err) =>{
      }
    })
    
  }

  public redisplayItemsAndFolder(folder: string): void { 
      
      let new_files =  new Array();
      this.currentFolder += folder+'/';
      for(let f of this.allFiles){
        if(f.folderName===folder){
          new_files.push(f);
        }
      }
      this.currentLevel += 1;
      this.currentFiles = new_files;
      this.currentFolders.clear();
      for(let f of this.allFiles){
        // slicice/moje/sdadas/fsafsa
        if(f.folderName !== '' && f.folderName.includes("/")){
          
          let value = f.folderName.split('/')[this.currentLevel].toString();
          let allSplit = f.folderName.split('/');
          let currentLevelInThisFolder = '';
          for(let i = 0;i<this.currentLevel;i++){
            currentLevelInThisFolder += allSplit[i].toString() + '/';
          }
          if(currentLevelInThisFolder === this.currentFolder){
            this.currentFolders.add(value);

          }
          
        }
      }
  }
  
  goBackFolder(){

    if(this.currentFolder === '')return;
    this.currentLevel -=1;
    let currentLevelInThisFolder = '';
    if(this.currentLevel == 0) this.currentFolder = '';

    else{
      let oldFolders = this.currentFolder.split('/');
      for(let i =0;i<this.currentLevel;i++){
        currentLevelInThisFolder += oldFolders[i].toString() + '/';

      }
      
    }
    this.currentFolder = currentLevelInThisFolder;
    let new_files =  new Array();
    for(let f of this.allFiles){
      
      if(f.folderName===this.currentFolder){
        new_files.push(f);
      }
    }

    this.currentFiles = new_files;
    this.currentFolders.clear();

    for(let f of this.allFiles){
      // slicice/moje/sdadas/fsafsa
      if(f.folderName !== ''){
        let value = f.folderName.split('/')[this.currentLevel].toString();
        let allSplit = f.folderName.split('/')
        let currentLevelInThisFolder = '';
        for(let i = 0;i<this.currentLevel;i++){
          currentLevelInThisFolder += allSplit[i].toString() + '/';
        }
        if(currentLevelInThisFolder === this.currentFolder){
          this.currentFolders.add(value);

        }
        
      }
    }
      
    
  }

  public constructor(private fileService: FileService){

  }



}
