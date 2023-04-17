import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.component.html',
  styleUrls: ['./enter-code.component.css']
})
export class EnterCodeComponent {

  CodeForm = new FormGroup({
    verifyCode: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)])
  });
  constructor( private router: Router, private authenticationService: AuthenticationService ) {}

  back(){

  }
  verify(){
    let user = localStorage.getItem('userEmail');
    this.authenticationService.activate(this.CodeForm.value.verifyCode, user)
    .then(() =>{
      this.router.navigate(['login']);
    }).catch((error) =>{
        console.log(error);
    });
    
  }
}
