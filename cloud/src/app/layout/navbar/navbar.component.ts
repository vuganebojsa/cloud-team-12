import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  loggedIn: boolean = false;

  constructor(private authenticationService: AuthenticationService){

  }
  logout(): void{
    this.authenticationService.logout();

  }
  
  ngOnInit(): void {
    this.authenticationService.userState$.subscribe((state) =>{
      if(state === null || state === undefined)
        this.loggedIn = false;
      else
        this.loggedIn = false;
    })
  }

}
