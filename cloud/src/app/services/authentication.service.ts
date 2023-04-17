import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '../models/token';
import { JwtHelperService } from '@auth0/angular-jwt';
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
    this.user$.next(this.getRole());
   }

   login(email:string, password:string):Observable<Token>{
    return this.http.post<Token>('adresa cognita', {email: email, password: password}, {
      headers:this.headers,
    });

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
    this.user$.next(this.getRole());
  }
}
