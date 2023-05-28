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
  files: FileInfo[];
  currentFolder = '';
  currentFolders = new Set();
  currentLevel = 0;
  ngOnInit(): void {
    this.fileService.getFiles().subscribe({
      next:(result) =>{
          this.files = result;
          this.isLoaded = true;
          for(let f of this.files){
            if(f.folderName !== ''){
              this.currentFolders.add(f.folderName.split('/')[0].toString());
            }
          }
          console.log(this.currentFolders);
      },
      error:(err) =>{

        
      }
    })
    
  }

  public constructor(private fileService: FileService){

  }

  public redisplayItemsAndFolder(folder: string): void {
    alert(folder);
  }
  

}
