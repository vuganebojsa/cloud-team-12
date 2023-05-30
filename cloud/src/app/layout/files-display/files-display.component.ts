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

  currentLevel = 0;
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
    this.fileService.postFolder(folderInfo).subscribe({
      next:(result) =>{
          
        this.fileService.postFolderS3(this.currentFolder + this.new_folder_name + '/').subscribe({
          next:(res) =>{

          },
          error:(error) =>{

          }
        })
        this.currentFolders.push(folderInfo);
        this.allFolders.push(folderInfo);
      },
      error:(err) =>{
        this.fileService.postFolderS3(this.currentFolder + this.new_folder_name + '/').subscribe({
          next:(res) =>{
              
          },
          error:(error) =>{

          }
        })
        this.currentFolders.push(folderInfo);
        this.allFolders.push(folderInfo);

      }
    })

  }
  uploadToCurrentFolder(): void{

  }

  showFile(file: FileInfo):void{
      this.fileService.getFile(file.folderName + '/' + file.filename).subscribe({
        next:(res) =>{
          const blb= new Blob([res], {type: file.type});

          var reader = new FileReader();
          reader.onload = function() {
            const src = `data:${file.type};base64,${reader.result}`;
            
            const link = document.createElement("a");
            link.href = src;
            link.download = file.filename;
            
            link.target = file.filename;
            link.click();
          }
          reader.readAsText(blb);
           
        },
        error:(err) =>{
          
        }
      })
  }

  public constructor(private fileService: FileService, private renderer: Renderer2){

  }



}
