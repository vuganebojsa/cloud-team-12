import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../app/services/authentication.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(private authenticationService: AuthenticationService, private router: Router){

  }
  ngOnInit(): void {
    this.authenticationService.userState$.subscribe((state) =>{
      if(state === null || state === undefined)
        this.router.navigate(['login']);
    });
  
  }
  title = 'cloud';


}
