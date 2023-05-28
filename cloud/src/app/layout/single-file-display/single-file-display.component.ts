import { Component, Input, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/models/FileInfo';

@Component({
  selector: 'app-single-file-display',
  templateUrl: './single-file-display.component.html',
  styleUrls: ['./single-file-display.component.css']
})
export class SingleFileDisplayComponent implements OnInit{
  @Input() file: FileInfo;

  public constructor(){

  }
  ngOnInit(): void {
    
  }

}
