import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-register-family-member',
  templateUrl: './register-family-member.component.html',
  styleUrls: ['./register-family-member.component.css']
})
export class RegisterFamilyMemberComponent implements OnInit{
  uploadForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email])
  });




  constructor(
    private fileService: FileService){

  }


  ngOnInit(): void {
    
  }

  register():void{
    if(!this.uploadForm.valid){
      alert('Please enter a valid email address.')
      return;

    }
    this.fileService.sendInvitationToFamilyMember(this.uploadForm.value.email).subscribe({
      next:(result) =>{
        
      },
      error:(err) =>{
        if(err.status === 0 || err.status === 200){
        }
      }
    })
  
  }
}
