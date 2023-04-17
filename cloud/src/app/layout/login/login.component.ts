import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    }
  );
  hasError = false;

  constructor(private router:Router,
              private authenticationService: AuthenticationService){}

  login(){
    if(!this.loginForm.valid) {this.hasError = true; return;}
    else this.hasError = false;

    let email:string | null | undefined = this.loginForm.value.email;
    let password:string | null | undefined = this.loginForm.value.password;
    if(email === null || password === null || email === undefined || password == undefined)
      return;


    this.authenticationService.login(email, password)
    .then((result) =>{
      alert('Successfull');
      console.log(result);
      localStorage.setItem('user', JSON.stringify(result["storage"]["CognitoIdentityServiceProvider.5rkbo68cl0pfrjc7trj0nmrq9n.vuga.accessToken"]));
      this.authenticationService.setUser();
    }).catch((error) =>{
        console.log(error);
    });
  

  }
}
