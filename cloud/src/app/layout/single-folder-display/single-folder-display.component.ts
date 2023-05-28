import { Component, Input, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/models/FileInfo';

@Component({
  selector: 'app-single-folder-display',
  templateUrl: './single-folder-display.component.html',
  styleUrls: ['./single-folder-display.component.css']
})
export class SingleFolderDisplayComponent implements OnInit{
  @Input() folderName: string;

  public constructor(){

  }
  ngOnInit(): void {
    
  }

}
