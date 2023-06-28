import { Component, Input, OnInit } from '@angular/core';
import { FileInfo } from 'src/app/models/FileInfo';

@Component({
  selector: 'app-display-info',
  templateUrl: './display-info.component.html',
  styleUrls: ['./display-info.component.css']
})
export class DisplayInfoComponent implements OnInit{


  ngOnInit(): void {

    if(!this.file){return;}
      
    
    
  }
  
  @Input() file: FileInfo;


}
