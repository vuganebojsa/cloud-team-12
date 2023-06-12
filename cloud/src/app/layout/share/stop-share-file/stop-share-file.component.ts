import { Component, OnInit } from '@angular/core';
import { SharedFile } from 'src/app/models/SharedFile';
import { FileService } from 'src/app/services/file.service';
import { Renderer2 } from '@angular/core'

@Component({
  selector: 'app-stop-share-file',
  templateUrl: './stop-share-file.component.html',
  styleUrls: ['./stop-share-file.component.css']
})
export class StopShareFileComponent implements OnInit{

  sharedFiles: SharedFile[];
  isLoaded = false;
  selectedFile: SharedFile;

  public constructor(private fileService: FileService,  private renderer: Renderer2){
    
  }
  ngOnInit(): void {
    
    this.fileService.getMySharedFilesInfo().subscribe({
      next:(res) =>{
        this.sharedFiles = res;
        this.isLoaded = true;
      },
      error:(err) =>{

      }
    });
  }

  stopShare():void{

    if(this.selectedFile === null){
      alert('Please select a file first.');
      return;
    }
    this.fileService.stopShareFile(this.selectedFile.id).subscribe({
      next:(res) =>{
        alert('Successfully stoped sharing the file to person:' + this.selectedFile.receiver);
      },
      error:(err) =>{

      }
    })

  }
  selectFile(event:any, file: SharedFile):void{
    if(file === this.selectedFile){
      this.selectedFile = null;
      let className = 'selected_file';

      this.renderer.removeClass(event.target, className);

      return;
    }
    this.selectedFile = file;
    let className = 'selected_file';
    const hasClass = event.target.classList.contains(className);
    if(hasClass){
      this.renderer.removeClass(event.target, className);
    }else{
      this.renderer.addClass(event.target, className);
    }
    
  }
}
