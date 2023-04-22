import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './layout/register/register.component';
import { LoginComponent } from './layout/login/login.component';
import { UploadFileComponent } from './layout/upload-file/upload-file.component';
import { EnterCodeComponent } from './layout/enter-code/enter-code.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'upload-file', component:UploadFileComponent},
  {path:'verify', component:EnterCodeComponent},
  {path:'**', component:HomeComponent},
  {path:'', component:HomeComponent},
  {path:'', component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
