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
  ngOnInit(): void {
    this.fileService.getFiles().subscribe({
      next:(result) =>{
          console.log(result);
      },
      error:(err) =>{

        
      }
    })
    
  }

  public constructor(private fileService: FileService){

  }

  

}
