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
      },
      error:(err) =>{
      }
    })
    
  }

  public redisplayItemsAndFolder(folder: string): void { 
      
      let new_files =  new Array();
      this.currentFolder += folder;
      for(let f of this.allFiles){
        if(f.folderName===this.currentFolder){
          new_files.push(f);
        }
      }
      this.currentFolder += '/';
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
            if(i != this.currentLevel - 1)
            currentLevelInThisFolder += allSplit[i].toString() + '/';
          else
            currentLevelInThisFolder += allSplit[i].toString();
            
          }
          if(currentLevelInThisFolder + '/' === this.currentFolder){
            this.currentFolders.add(value);

          }
          
        }
      }
  }
  
  goBackFolder(){

    if(this.currentFolder ==='') return;
    this.currentLevel -= 1;
    
    //slike/slash/ - > slike/

    let newCurrentFolder = '';
    let folders = this.currentFolder.split('/');
    for(let i =0;i<this.currentLevel;i++){
        newCurrentFolder += folders[i] + '/';
    }
    this.currentFolder = newCurrentFolder;
    this.currentFiles.length = 0;
    if(this.currentLevel == 0){
      for(let f of this.allFiles){
        if(f.folderName ===this.currentFolder){
            this.currentFiles.push(f);
        }
      }



    }else{
      for(let f of this.allFiles){
        if(f.folderName + '/'===this.currentFolder){
            this.currentFiles.push(f);
        }
      }

    }
    this.currentFolders.clear();
    let targetChar = '/';
    for(let f of this.allFiles){
        if(f.folderName !== '' && f.folderName.includes('/') && this.currentLevel != 0){
          let lastIndex = f.folderName.lastIndexOf(targetChar);
          if(lastIndex != -1){
            this.currentFolders.add(f.folderName.substring(lastIndex + 1, f.folderName.length));
          }
         
        }if(f.folderName !== '' && !f.folderName.includes('/') && this.currentLevel == 0){
          this.currentFolders.add(f.folderName);
        }
      
    }

  }

  uploadToCurrentFolder(): void{

  }

  showFile(file: FileInfo):void{

  }

  public constructor(private fileService: FileService){

  }



}
