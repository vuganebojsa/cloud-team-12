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
      const keyPrefix = result["keyPrefix"];
      const username = result["storage"][keyPrefix+".LastAuthUser"];
      localStorage.setItem('user', JSON.stringify(result["storage"][keyPrefix + "." +username+".accessToken"]));
      this.authenticationService.setUser(result);
      this.router.navigate(['upload-file']);
    }).catch((error) =>{
        alert(error.message);

    });
  

  }
}
