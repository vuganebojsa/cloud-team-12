import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './layout/register/register.component';
import { LoginComponent } from './layout/login/login.component';
import { UploadFileComponent } from './layout/upload-file/upload-file.component';
import { EnterCodeComponent } from './layout/enter-code/enter-code.component';
import { HomeComponent } from './layout/home/home.component';
import { ShareFileToOtherComponent } from './layout/share/share-file-to-other/share-file-to-other.component';
import { SharedFilesComponent } from './layout/share/shared-files/shared-files.component';
import { StopShareFileComponent } from './layout/share/stop-share-file/stop-share-file.component';

const routes: Routes = [
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'upload-file', component:UploadFileComponent},
  {path:'verify', component:EnterCodeComponent},
  {path:'share-file', component:ShareFileToOtherComponent},
  {path:'shared-files', component:SharedFilesComponent},
  {path:'stop-share', component:StopShareFileComponent},
  {path:'**', component:HomeComponent},
  {path:'', component:HomeComponent},
  {path:'', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
