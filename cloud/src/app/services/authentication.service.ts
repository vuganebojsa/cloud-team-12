import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '../models/token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environment/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip:'true',
  });

   user$ = new BehaviorSubject(null);
  userState$ = this.user$.asObservable();

  constructor(private http:HttpClient) {
    Amplify.configure({
      Auth:environment.cognito
    });
    this.user$.next(this.getRole());

   }

   login(email:string, password:string):Promise<any>{
    return Auth.signIn(email, password);

  }

  logout():void{
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('user') != null;
  }

  getRole():any{
    if(this.isLoggedIn()){
      const accessToken: string = localStorage.getItem('user');
      const helper = new JwtHelperService();

      const role = helper.decodeToken(accessToken).role[0].authority;
      return role;
    }
    return null;
  }

  setUser(): void{
    //this.user$.next(this.getRole());
  }

  register(user: User) : Promise<any> { 
    return Auth.signUp({
      username:user.username,
      password:user.password,
      attributes:{
        given_name:user.name,
        family_name:user.surname,
        birthdate: user.birthDate,
        email:user.email
      }
     
    });
  }

  activate(activateCode: string, userEmail: string): Promise<any>{
    return Auth.confirmSignUp(userEmail, activateCode);
  }
}
