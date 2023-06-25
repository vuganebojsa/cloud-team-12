import { Component, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/models/FileInfo';
import { FolderInfo } from 'src/app/models/Folder';
import { FileService } from 'src/app/services/file.service';
import { Renderer2 } from '@angular/core'

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
  currentFolders = new Array();
  allFolders: FolderInfo[];
  new_folder_name:string = '';
  upload_pressed = false;
  currentLevel = 0;
  selectedFile: FileInfo = null;
  ngOnInit(): void {

    this.fileService.getFiles().subscribe({
      next:(result) =>{
          this.allFiles = result;
          for(let f of this.allFiles){
            if(f.folderName === ''){
              this.currentFiles.push(f);

            }
          }

          this.fileService.getFolders().subscribe({
            next: (res) =>{
                this.allFolders = res;
                console.log(this.allFolders);
                for(let f of this.allFolders){
                  if(f.path==='')
                    this.currentFolders.push(f);
                }
                this.isLoaded = true;

            },
            error:(error) =>{

            }
          })
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
      this.currentFiles = new_files;

      this.currentFolder += '/';
      let new_folders = new Array();
      for(let f of this.allFolders){
        if(f.path===this.currentFolder){
          new_folders.push(f);

        }
      }
      
      this.currentLevel += 1;
      this.currentFolders = new_folders;
     
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
    this.currentFolders.length = 0;
    if(this.currentLevel == 0){
      for(let f of this.allFiles){
        if(f.folderName ===this.currentFolder){
            this.currentFiles.push(f);
        }
      }
      for(let f of this.allFolders){
        if(f.path===this.currentFolder){
            this.currentFolders.push(f);
        }
      }



    }else{
      for(let f of this.allFiles){
        if(f.folderName + '/'===this.currentFolder){
            this.currentFiles.push(f);
        }
      }
      for(let f of this.allFolders){
        if(f.path===this.currentFolder){
            this.currentFolders.push(f);
        }
      }

    }
    

  }

  createFolder():void{
    this.new_folder_name = this.new_folder_name.trim();
    if(this.new_folder_name === ''){
      return;
    }else if(this.new_folder_name.includes('/')){
      return;
    }
    for(let f of this.currentFolders){
      if(this.currentFolder + this.new_folder_name === f.path + f.foldername){
        alert('Folder with that name already exists');
        return;
      }
    }
  

    let folderInfo: FolderInfo ={
      foldername: this.new_folder_name,
      path:this.currentFolder

    } 
    this.fileService.addFolderOverall(folderInfo).subscribe({
      next:(result) =>{
        alert('Successfully created folder: ' + this.new_folder_name);
        this.currentFolders.push(folderInfo);
        this.allFolders.push(folderInfo);
      },
      error:(err) =>{
          if(err.status === 200){
            alert('Successfully created folder: ' + this.new_folder_name);
            this.currentFolders.push(folderInfo);
            this.allFolders.push(folderInfo);
          }
        }
    });
    

  }
  downloadSelected():void{
    if(this.selectedFile === null){
      alert('Please select a file first.');
      return;
    }
    this.fileService.getFile(this.selectedFile.folderName + '/' + this.selectedFile.filename).subscribe({
      next:(res) =>{
        const blb= new Blob([res], {type: this.selectedFile.type});
        let f = this.selectedFile;
        var reader = new FileReader();
        reader.onload = function() {
          const src = `data:${f.type};base64,${reader.result}`;
          
          const link = document.createElement("a");
          link.href = src;
          link.download = f.filename;
          
          link.target = f.filename;
          link.click();
        }
        reader.readAsText(blb);
         
      },
      error:(err) =>{
        
      }
    })
  }

  deleteSelectedFile():void{
    if(this.selectedFile === null){
      alert('Please select a file first.');
      return;
    }
    let newFile = this.selectedFile;

    this.fileService.deleteFileOverall(newFile).subscribe({
      next:(result) =>{
        alert('Successfully deleted file ' + newFile.filename);
        
      },
      error:(err) =>{
        if(err.status === 204 || err.status === 200 || err.status === 0){
          alert('Successfully deleted file!');
        }
      }
    })
    
  }


  uploadToCurrentFolder(): void{
    this.upload_pressed = !this.upload_pressed;
  }



  showFile(event:any, file: FileInfo):void{
    let className = 'selected_file';
    const hasClass = event.target.classList.contains(className);
    if(hasClass){
      this.renderer.removeClass(event.target, className);
    }else{
      this.renderer.addClass(event.target, className);
    }
    if(file === this.selectedFile){
      this.selectedFile = null;
      return;
    }
    this.selectedFile = file;
    
    
  }

  public constructor(private fileService: FileService, private renderer: Renderer2){

  }



}
