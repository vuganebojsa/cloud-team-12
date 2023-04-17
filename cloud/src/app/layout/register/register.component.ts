import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  registerForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    birthDate: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private router: Router, private authenticationService: AuthenticationService)
  {

  }
  register():void{
    let user:User = {
      email: this.registerForm.value.email,
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      password: this.registerForm.value.password,
      birthDate:this.registerForm.value.birthDate,
      username:this.registerForm.value.surname
    };
    this.authenticationService.register(user)
        .then(() =>{
            console.log(user);
        }).catch((error) =>{
            console.log(error);
        })

  }
}
