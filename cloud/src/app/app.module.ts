import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { UploadFileComponent } from './layout/upload-file/upload-file.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/interceptor';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { EnterCodeComponent } from './layout/enter-code/enter-code.component';
import { HomeNavbarComponent } from './layout/home-navbar/home-navbar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { UserNavbarComponent } from './layout/user-navbar/user-navbar.component';
import { HomeComponent } from './layout/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UploadFileComponent,
    EnterCodeComponent,
    HomeNavbarComponent,
    NavbarComponent,
    UserNavbarComponent,
    HomeComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule

  ],
  providers: [{  provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
