import { Component, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/models/FileInfo';
import { FileService } from 'src/app/services/file.service';
import { TokenDecoderService } from 'src/app/services/token-decoder.service';

@Component({
  selector: 'app-shared-files',
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.css']
})
export class SharedFilesComponent implements OnInit{

  isLoaded = false;
  files: FileInfo[];

  public constructor(private fileService: FileService, private tokenDecoderService: TokenDecoderService){
    // shared files of other people to me, where i have a button to download
  }


  ngOnInit(): void {
    this.fileService.getSharedFiles().subscribe({
      next:(res) =>{
          this.files = res;
          this.isLoaded = true;

      },
      error:(err) =>{

      }
    })
   
  }

  downloadFile(file: FileInfo): void{
    let username = this.tokenDecoderService.getDecodedAccesToken()["cognito:username"];
    let path = file.folderName;

    if(path.trim() === ''){
      
        path = btoa(file.filename);
        this.fileService.downloadSharedFile(path).subscribe({
          next:(res) =>{
            const blb= new Blob([res], {type: file.type});
            let f = file;
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
        });
      
    }else{
      path = file.username + '-' + file.folderName + '/' + file.filename;
      console.log(path);
      path = btoa(path);
      console.log(path);
      this.fileService.downloadSharedFile(path).subscribe(
        {
          next:(res) =>{
            const blb= new Blob([res], {type: file.type});
            let f = file;
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
        }
      );
    }
   
  }
}
