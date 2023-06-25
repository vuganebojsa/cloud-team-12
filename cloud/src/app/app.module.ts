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
import { FilesDisplayComponent } from './layout/files-display/files-display.component';
import { SingleFileDisplayComponent } from './layout/single-file-display/single-file-display.component';
import { SingleFolderDisplayComponent } from './layout/single-folder-display/single-folder-display.component';
import { ShareFileToOtherComponent } from './layout/share/share-file-to-other/share-file-to-other.component';
import { SharedFilesComponent } from './layout/share/shared-files/shared-files.component';
import { StopShareFileComponent } from './layout/share/stop-share-file/stop-share-file.component';
import { MoveContentComponent } from './layout/move-content/move-content.component';
import { RegisterFamilyMemberComponent } from './layout/register-family-member/register-family-member.component';
import { RegisterFromInviteComponent } from './layout/register-from-invite/register-from-invite.component';
import { ConfirmInviteComponent } from './layout/confirm-invite/confirm-invite.component';


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
    HomeComponent,
    FilesDisplayComponent,
    SingleFileDisplayComponent,
    SingleFolderDisplayComponent,
    ShareFileToOtherComponent,
    SharedFilesComponent,
    StopShareFileComponent,
    MoveContentComponent,
    RegisterFamilyMemberComponent,
    RegisterFromInviteComponent,
    ConfirmInviteComponent
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
