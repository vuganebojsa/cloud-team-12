import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InviteUser, User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-from-invite',
  templateUrl: './register-from-invite.component.html',
  styleUrls: ['./register-from-invite.component.css']
})
export class RegisterFromInviteComponent {
  registerForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    birthDate: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    inviteUsername: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private router: Router, private authenticationService: AuthenticationService)
  {

  }
  register():void{
    let user:InviteUser = {
      email: this.registerForm.value.email,
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      password: this.registerForm.value.password,
      birthDate:this.registerForm.value.birthDate,
      username:this.registerForm.value.username,
      inviterUsername: this.registerForm.value.inviteUsername
    };
    if(user.username.includes('-')){
      alert('Invalid username. Please remove the character -.');
      return;
    }
    this.authenticationService.registerFromInvite(user).subscribe({
      next:(res) =>{

      },
      error:(err)=>{

      }
    });
       

  }
}
