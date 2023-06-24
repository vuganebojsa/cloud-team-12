import {  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environment/environment';
import { InviteUser, User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  user$ = new BehaviorSubject(null);
  userState$ = this.user$.asObservable();
  register_from_invite_url:string = '';
  constructor(private http: HttpClient) {
    Amplify.configure({
      Auth:environment.cognito
    });
    this.user$.next(this.isLoggedIn());

   
  }
   login(email:string, password:string):Promise<any>{
    return Auth.signIn(email, password);

  }

  logout():Promise<any>{
    localStorage.removeItem('user');
    this.setUser(null);
    return Auth.signOut();
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined;
  }

  getRole():any{
    // if(this.isLoggedIn()){
    //   const accessToken: string = localStorage.getItem('user');
    //   const helper = new JwtHelperService();

    //   const role = helper.decodeToken(accessToken).role[0].authority;
    //   return role;
    // }
    return null;
  }

  setUser(user: any): void{
    this.user$.next(user);
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
  registerFromInvite(user: InviteUser) : Observable<any> { 
    return this.http.post<any>(this.register_from_invite_url, user);
  }

  activate(activateCode: string, userEmail: string): Promise<any>{
    return Auth.confirmSignUp(userEmail, activateCode);
  }
}
